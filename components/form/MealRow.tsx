import { useState } from "react";
import { Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { formatTime, styles } from "../../screens/form/Form";
import { DateTimePicker, WebTimePicker } from "./DateTimePicker";


type MealType = "Breakfast" | "Lunch" | "Dinner" | "Snack" | "HypoCorrection";

export interface MealEntry {
	id: string;
	carbs: string;
	meal_type: MealType;
	logged_at: Date;
}

export const MEAL_TYPES: MealType[] = [
	"Breakfast",
	"Lunch",
	"Dinner",
	"Snack",
	"HypoCorrection",
];

const MEAL_ICONS: Record<MealType, string> = {
	Breakfast: "🌅",
	Lunch: "☀️",
	Dinner: "🌙",
	Snack: "🍎",
	HypoCorrection: "🍬",
};

export default function MealRow({
	entry,
	onChange,
	onRemove,
}: {
	entry: MealEntry;
	onChange: (e: MealEntry) => void;
	onRemove: () => void;
}) {
	const [showPicker, setShowPicker] = useState(false);

	const handleTimeChange = (_event: any, selected?: Date) => {
		if (Platform.OS === "android") setShowPicker(false);
		if (selected) onChange({ ...entry, logged_at: selected });
	};

	return (
		<View style={styles.entryRow}>
			{/* Meal type pill selector */}
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				style={styles.pillScroll}
			>
				{MEAL_TYPES.map((t) => (
					<TouchableOpacity
						key={t}
						style={[styles.pill, entry.meal_type === t && styles.pillActive]}
						onPress={() => onChange({ ...entry, meal_type: t })}
					>
						<Text
							style={[
								styles.pillText,
								entry.meal_type === t && styles.pillTextActive,
							]}
						>
							{MEAL_ICONS[t]} {t}
						</Text>
					</TouchableOpacity>
				))}
			</ScrollView>

			<View style={styles.entryInputRow}>
				<View style={styles.inputGroup}>
					<Text style={styles.inputLabel}>Carbs (g)</Text>
					<TextInput
						style={styles.input}
						value={entry.carbs}
						onChangeText={(v) => onChange({ ...entry, carbs: v })}
						keyboardType="numeric"
						placeholder="0"
						placeholderTextColor="#C4B5D8"
						maxLength={4}
					/>
				</View>

				<View style={styles.inputGroup}>
					<Text style={styles.inputLabel}>Time</Text>

					{Platform.OS === "web" ? (
						// Web: the <input type="time"> is always visible and interactive inline
						<View style={styles.timeDisplay}>
							<WebTimePicker
								value={entry.logged_at}
								onChange={(d) => onChange({ ...entry, logged_at: d })}
							/>
						</View>
					) : (
						<TouchableOpacity
							style={styles.timeDisplay}
							onPress={() => setShowPicker(true)}
							activeOpacity={0.7}
						>
							<Text style={styles.timeDisplayText}>
								{formatTime(entry.logged_at)}
							</Text>
							<Text style={styles.timeEditHint}>✎</Text>
						</TouchableOpacity>
					)}
				</View>

				<TouchableOpacity style={styles.removeBtn} onPress={onRemove}>
					<Text style={styles.removeBtnText}>✕</Text>
				</TouchableOpacity>
			</View>

			{/* Native-only picker (iOS spinner / Android dialog) */}
			{Platform.OS !== "web" && showPicker && (
				<>
					<DateTimePicker
						value={entry.logged_at}
						mode="time"
						is24Hour={true}
						display={Platform.OS === "ios" ? "spinner" : "default"}
						onChange={handleTimeChange}
						maximumDate={new Date()}
					/>
					{Platform.OS === "ios" && (
						<TouchableOpacity
							style={styles.timePickerDone}
							onPress={() => setShowPicker(false)}
						>
							<Text style={styles.timePickerDoneText}>Done</Text>
						</TouchableOpacity>
					)}
				</>
			)}
		</View>
	);
}