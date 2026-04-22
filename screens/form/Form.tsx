/**
 * LogEntryForm.tsx
 * ─────────────────────────────────────────────────────────────
 * Health data entry form for glucose prediction.
 *
 * What the user fills in:
 *   1. Meals        → carbs (g) + meal type + timestamp
 *   2. Insulin      → bolus dose (U) + timestamp
 *   3. Activity     → steps or exercise session + timestamp
 *
 * What is auto-populated / mocked (real app: from CGM/HealthKit):
 *   • CGM glucose readings (last 2 h window shown as preview)
 *
 * Payload shape sent to FastAPI  /api/log-entry  (POST):
 * {
 *   meals: [{ carbs, meal_type, logged_at }],
 *   boluses: [{ dose_units, logged_at }],
 *   activity: [{ steps, logged_at }],
 *   cgm_preview: [{ glucose, timestamp }]   // last N readings
 * }
 *
 * The FastAPI backend is responsible for:
 *   • Aligning entries to 5-min time steps
 *   • Computing insulin_activity via PK model
 *   • Computing steps_weighted_avg
 *   • Building the feature matrix for the LSTM
 * ─────────────────────────────────────────────────────────────
 */

import ActivityRow, { ActivityEntry } from "@/components/form/ActivityRow";
import BolusRow, { BolusEntry } from "@/components/form/BolusRow";
import FormHeader from "@/components/form/Header";
import MealRow, { MealEntry } from "@/components/form/MealRow";
import React, { useRef, useState } from "react";
import {
	Alert,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// ─── Mock CGM data (replace with real import) ───

const MOCK_CGM = [
	{ glucose: 83, timestamp: new Date(Date.now() - 10 * 60000) },
	{ glucose: 88, timestamp: new Date(Date.now() - 5 * 60000) },
	{ glucose: 93, timestamp: new Date() },
];

// ─── Helpers ──────────────────────────────────────────────────

const uid = () => Math.random().toString(36).slice(2, 9);


export const formatTime = (d: Date) =>
	d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

// ─── Sub-components ───────────────────────────────────────────

function SectionHeader({ icon, title }: { icon: string; title: string }) {
	return (
		<View style={styles.sectionHeader}>
			<Text style={styles.sectionIcon}>{icon}</Text>
			<Text style={styles.sectionTitle}>{title}</Text>
		</View>
	);
}

function CGMPreview() {
	const latest = MOCK_CGM[MOCK_CGM.length - 1];
	const prev = MOCK_CGM[MOCK_CGM.length - 2];
	const delta = latest.glucose - prev.glucose;
	const trend = delta > 0 ? "↑" : delta < 0 ? "↓" : "→";
	const trendColor =
		delta > 2 ? "#FF6B6B" : delta < -2 ? "#4ECDC4" : "#A8E6CF";

	return (
		<View style={styles.cgmCard}>
			<View style={styles.cgmLeft}>
				<Text style={styles.cgmLabel}>CURRENT GLUCOSE</Text>
				<View style={styles.cgmValueRow}>
					<Text style={styles.cgmValue}>{latest.glucose}</Text>
					<Text style={styles.cgmUnit}> mg/dL</Text>
					<Text style={[styles.cgmTrend, { color: trendColor }]}>{trend}</Text>
				</View>
				<Text style={styles.cgmSub}>
					{delta > 0 ? "+" : ""}
					{delta} from 5 min ago · auto-imported
				</Text>
			</View>
			<View style={styles.cgmMiniChart}>
				{MOCK_CGM.map((pt, i) => {
					const h = ((pt.glucose - 70) / 100) * 40;
					return (
						<View
							key={i}
							style={[styles.cgmBar, { height: Math.max(4, h) }]}
						/>
					);
				})}
			</View>
		</View>
	);
}

export default function UserForm() {
	const [meals, setMeals] = useState<MealEntry[]>([]);
	const [boluses, setBoluses] = useState<BolusEntry[]>([]);
	const [activity, setActivity] = useState<ActivityEntry[]>([]);
	const [submitting, setSubmitting] = useState(false);
	const [entryDate, setEntryDate] = useState(new Date());

	const scrollRef = useRef<ScrollView>(null);

	// ── Add handlers ──────────────────────────────────────────

	const addMeal = () =>
		setMeals((prev) => [
			...prev,
			{ id: uid(), carbs: "", meal_type: "Snack", logged_at: new Date() },
		]);

	const addBolus = () =>
		setBoluses((prev) => [
			...prev,
			{ id: uid(), dose_units: "", logged_at: new Date() },
		]);

	const addActivity = () =>
		setActivity((prev) => [
			...prev,
			{ id: uid(), steps: "", logged_at: new Date() },
		]);

	// ── Validation ────────────────────────────────────────────

	const validate = (): string | null => {
		for (const m of meals) {
			if (!m.carbs || isNaN(Number(m.carbs)) || Number(m.carbs) < 0)
				return "Enter valid carbs for all meals.";
		}
		for (const b of boluses) {
			if (!b.dose_units || isNaN(Number(b.dose_units)) || Number(b.dose_units) < 0)
				return "Enter valid insulin doses for all boluses.";
		}
		for (const a of activity) {
			if (!a.steps || isNaN(Number(a.steps)) || Number(a.steps) < 0)
				return "Enter valid step count for all activity entries.";
		}
		return null;
	};

	// ── Build payload ─────────────────────────────────────────
	// Transforms raw form state into the shape FastAPI expects.
	// Backend will align these to 5-min time steps and compute
	// derived features (insulin_activity, steps_weighted_avg, etc.)

	const buildPayload = () => ({
		meals: meals.map((m) => ({
			carbs: Number(m.carbs),
			meal_type: m.meal_type,
			logged_at: m.logged_at.toISOString(),
		})),
		boluses: boluses.map((b) => ({
			dose_units: Number(b.dose_units),
			logged_at: b.logged_at.toISOString(),
		})),
		activity: activity.map((a) => ({
			steps: Number(a.steps),
			logged_at: a.logged_at.toISOString(),
		})),
		cgm_preview: MOCK_CGM.map((c) => ({
			glucose: c.glucose,
			timestamp: c.timestamp.toISOString(),
		})),
	});

	// ── Submit ────────────────────────────────────────────────

	const handleSubmit = async () => {
		const err = validate();
		if (err) {
			Alert.alert("Check your entries", err);
			return;
		}

		setSubmitting(true);
		const payload = buildPayload();

		try {
			// TODO: replace with your FastAPI base URL
			// const res = await fetch("http://YOUR_API/api/log-entry", {
			//   method: "POST",
			//   headers: { "Content-Type": "application/json" },
			//   body: JSON.stringify(payload),
			// });
			// const data = await res.json();

			// Mock success for now
			console.log("Payload →", JSON.stringify(payload, null, 2));
			await new Promise((r) => setTimeout(r, 800));
			Alert.alert("✅ Logged!", "Your data was saved. Prediction incoming.");
		} catch (e) {
			Alert.alert("Error", "Could not connect to server.");
		} finally {
			setSubmitting(false);
		}
	};

	// ─────────────────────────────────────────────────────────

	return (
		<SafeAreaView style={styles.safe}>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={{ flex: 1 }}
			>
				<ScrollView
					ref={scrollRef}
					contentContainerStyle={styles.scroll}
					keyboardShouldPersistTaps="handled"
				>
					{/* Header */}
					<FormHeader date={entryDate} onChange={setEntryDate} />

					{/* CGM Preview */}
					<SectionHeader icon="📡" title="Glucose (CGM)" />
					<CGMPreview />

					{/* ── Meals ─────────────────────────────── */}
					<SectionHeader icon="🍽️" title="Meals" />
					{meals.length === 0 && (
						<Text style={styles.emptyHint}>No meals logged yet.</Text>
					)}
					{meals.map((m) => (
						<MealRow
							key={m.id}
							entry={m}
							onChange={(updated) =>
								setMeals((prev) =>
									prev.map((x) => (x.id === updated.id ? updated : x))
								)
							}
							onRemove={() =>
								setMeals((prev) => prev.filter((x) => x.id !== m.id))
							}
						/>
					))}
					<TouchableOpacity style={styles.addBtn} onPress={addMeal}>
						<Text style={styles.addBtnText}>+ Add Meal</Text>
					</TouchableOpacity>

					{/* ── Insulin ───────────────────────────── */}
					<SectionHeader icon="💉" title="Insulin Bolus" />
					{boluses.length === 0 && (
						<Text style={styles.emptyHint}>No boluses logged yet.</Text>
					)}
					{boluses.map((b) => (
						<BolusRow
							key={b.id}
							entry={b}
							onChange={(updated) =>
								setBoluses((prev) =>
									prev.map((x) => (x.id === updated.id ? updated : x))
								)
							}
							onRemove={() =>
								setBoluses((prev) => prev.filter((x) => x.id !== b.id))
							}
						/>
					))}
					<TouchableOpacity style={styles.addBtn} onPress={addBolus}>
						<Text style={styles.addBtnText}>+ Add Bolus</Text>
					</TouchableOpacity>

					{/* ── Activity ──────────────────────────── */}
					<SectionHeader icon="🏃" title="Physical Activity" />
					{activity.length === 0 && (
						<Text style={styles.emptyHint}>No activity logged yet.</Text>
					)}
					{activity.map((a) => (
						<ActivityRow
							key={a.id}
							entry={a}
							onChange={(updated) =>
								setActivity((prev) =>
									prev.map((x) => (x.id === updated.id ? updated : x))
								)
							}
							onRemove={() =>
								setActivity((prev) => prev.filter((x) => x.id !== a.id))
							}
						/>
					))}
					<TouchableOpacity style={styles.addBtn} onPress={addActivity}>
						<Text style={styles.addBtnText}>+ Add Activity</Text>
					</TouchableOpacity>

					{/* ── Submit ────────────────────────────── */}
					<TouchableOpacity
						style={[styles.submitBtn, submitting && styles.submitBtnDisabled]}
						onPress={handleSubmit}
						disabled={submitting}
					>
						<Text style={styles.submitBtnText}>
							{submitting ? "Saving…" : "Save"}
						</Text>
					</TouchableOpacity>

					{/* Data note */}
					<Text style={styles.footerNote}>
						CGM data is auto-imported from your sensor.{"\n"}
					</Text>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}

// ─── Styles ───────────────────────────────────────────────────

const theme = {
	bg: "#F2EDF8",
	surface: "#FFFFFF",
	surfaceHigh: "#EDE5F5",
	accent: "#8B5CF6",
	accentDim: "#8B5CF615",
	text: "#2D1B4E",
	textSub: "#9B89B4",
	border: "#DDD5EC",
	danger: "#E05C8A",
};


export const styles = StyleSheet.create({
	safe: {
		flex: 1,
		backgroundColor: theme.bg,
	},
	scroll: {
		paddingHorizontal: 20,
		paddingBottom: 60,
	},

	// Header
	headerTitle: {
		fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
		fontSize: 32,
		fontWeight: "700",
		color: theme.text,
		letterSpacing: -0.5,
	},
	headerSub: {
		fontSize: 14,
		color: theme.textSub,
		marginTop: 2,
		letterSpacing: 0.5,
		textTransform: "uppercase",
	},

	// Section header
	sectionHeader: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 28,
		marginBottom: 12,
		gap: 8,
	},
	sectionIcon: { fontSize: 18 },
	sectionTitle: {
		fontSize: 13,
		fontWeight: "700",
		color: theme.accent,
		letterSpacing: 1.5,
		textTransform: "uppercase",
	},

	// CGM card
	cgmCard: {
		backgroundColor: theme.surface,
		borderRadius: 16,
		padding: 20,
		borderWidth: 1,
		borderColor: theme.border,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	cgmLeft: { flex: 1 },
	cgmLabel: {
		fontSize: 10,
		color: theme.textSub,
		letterSpacing: 1.5,
		textTransform: "uppercase",
		marginBottom: 4,
	},
	cgmValueRow: {
		flexDirection: "row",
		alignItems: "baseline",
	},
	cgmValue: {
		fontSize: 44,
		fontWeight: "800",
		color: theme.text,
		fontFamily: Platform.OS === "ios" ? "Courier New" : "monospace",
	},
	cgmUnit: {
		fontSize: 14,
		color: theme.textSub,
		marginLeft: 2,
	},
	cgmTrend: {
		fontSize: 28,
		marginLeft: 8,
		fontWeight: "700",
	},
	cgmSub: {
		fontSize: 12,
		color: theme.textSub,
		marginTop: 4,
	},
	cgmMiniChart: {
		flexDirection: "row",
		alignItems: "flex-end",
		gap: 4,
		height: 44,
	},
	cgmBar: {
		width: 8,
		backgroundColor: theme.accent,
		borderRadius: 3,
		opacity: 0.7,
	},

	// Entry rows
	entryRow: {
		backgroundColor: theme.surface,
		borderRadius: 14,
		padding: 16,
		marginBottom: 10,
		borderWidth: 1,
		borderColor: theme.border,
	},
	entryInputRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
	},
	entryHint: {
		fontSize: 11,
		color: theme.textSub,
		marginTop: 10,
		fontStyle: "italic",
	},

	// Pill selector
	pillScroll: {
		marginBottom: 12,
	},
	pill: {
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 20,
		backgroundColor: theme.surfaceHigh,
		marginRight: 8,
		borderWidth: 1,
		borderColor: theme.border,
	},
	pillActive: {
		backgroundColor: theme.accentDim,
		borderColor: theme.accent,
	},
	pillText: {
		fontSize: 12,
		color: theme.textSub,
	},
	pillTextActive: {
		color: theme.accent,
		fontWeight: "700",
	},

	// Input fields
	inputGroup: {
		flex: 1,
	},
	inputLabel: {
		fontSize: 10,
		color: theme.textSub,
		letterSpacing: 1.2,
		textTransform: "uppercase",
		marginBottom: 6,
	},
	input: {
		backgroundColor: theme.surfaceHigh,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: theme.border,
		paddingHorizontal: 12,
		paddingVertical: 10,
		color: theme.text,
		fontSize: 18,
		fontFamily: Platform.OS === "ios" ? "Courier New" : "monospace",
		fontWeight: "700",
	},

	// Remove button
	removeBtn: {
		width: 32,
		height: 32,
		borderRadius: 16,
		backgroundColor: "#FF6B6B18",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 16,
	},
	removeBtnText: {
		color: theme.danger,
		fontSize: 13,
		fontWeight: "700",
	},

	// Add button
	addBtn: {
		borderWidth: 1,
		borderColor: theme.accent,
		borderStyle: "dashed",
		borderRadius: 12,
		paddingVertical: 12,
		alignItems: "center",
		marginBottom: 4,
	},
	addBtnText: {
		color: theme.accent,
		fontSize: 14,
		fontWeight: "600",
		letterSpacing: 0.5,
	},

	// Empty state
	emptyHint: {
		color: theme.textSub,
		fontSize: 13,
		fontStyle: "italic",
		marginBottom: 8,
		paddingLeft: 4,
	},

	// Submit
	submitBtn: {
		backgroundColor: theme.accent,
		borderRadius: 16,
		paddingVertical: 18,
		alignItems: "center",
		marginTop: 32,
	},
	submitBtnDisabled: {
		opacity: 0.5,
	},
	submitBtnText: {
		color: "#0D0F14",
		fontSize: 17,
		fontWeight: "800",
		letterSpacing: 0.5,
	},

	// Footer
	footerNote: {
		fontSize: 11,
		color: theme.textSub,
		textAlign: "center",
		marginTop: 20,
		lineHeight: 18,
		fontStyle: "italic",
	},

	timeDisplay: {
		// replace your existing plain <Text> style with this touchable version
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: theme.surfaceHigh,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: theme.border,
		paddingHorizontal: 12,
		paddingVertical: 10,
		overflow: "hidden",
	},
	timeDisplayText: {
		color: theme.textSub,
		fontSize: 15,
		fontFamily: Platform.OS === "ios" ? "Courier New" : "monospace",
	},
	timeEditHint: {
		fontSize: 12,
		color: theme.accent,
		marginLeft: 6,
	},
	timePickerDone: {
		alignSelf: "flex-end",
		marginTop: 6,
		paddingHorizontal: 16,
		paddingVertical: 8,
		backgroundColor: theme.accentDim,
		borderRadius: 8,
	},
	timePickerDoneText: {
		color: theme.accent,
		fontWeight: "700",
		fontSize: 14,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingTop: 24,
		paddingBottom: 8,
		marginBottom: 8,
	},
	headerDateBox: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
		backgroundColor: theme.surfaceHigh,
		borderRadius: 8,
		paddingHorizontal: 10,
		paddingVertical: 6,
		borderWidth: 1,
		borderColor: theme.border,
	},
	headerDateText: {
		fontSize: 13,
		color: theme.textSub,
	},
	headerDateEdit: {
		fontSize: 11,
		color: theme.accent,
	},
});