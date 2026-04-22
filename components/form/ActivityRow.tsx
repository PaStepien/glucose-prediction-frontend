import { useState } from "react";
import { Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import { formatTime, styles } from "../../screens/form/Form";
import { DateTimePicker, WebTimePicker } from "./DateTimePicker";

export interface ActivityEntry {
	id: string;
	steps: string;
	logged_at: Date;
}

export default function ActivityRow({
	entry,
	onChange,
	onRemove,
}: {
	entry: ActivityEntry;
	onChange: (e: ActivityEntry) => void;
	onRemove: () => void;
}) {
	const [showPicker, setShowPicker] = useState(false);

	const handleTimeChange = (_event: any, selected?: Date) => {
		if (Platform.OS === "android") setShowPicker(false);
		if (selected) onChange({ ...entry, logged_at: selected });
	};
	return (
		<View style={styles.entryRow}>
			<View style={styles.entryInputRow}>
				<View style={styles.inputGroup}>
					<Text style={styles.inputLabel}>Steps</Text>
					<TextInput
						style={styles.input}
						value={entry.steps}
						onChangeText={(v) => onChange({ ...entry, steps: v })}
						keyboardType="numeric"
						placeholder="0"
						placeholderTextColor="#556"
						maxLength={6}
					/>
				</View>
				<View style={styles.inputGroup}>
					<Text style={styles.inputLabel}>Time</Text>
					{Platform.OS === "web" ? (
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
