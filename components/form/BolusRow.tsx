import { useState } from "react";
import { Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import { formatTime, styles } from "../../screens/form/Form";
import { DateTimePicker, WebTimePicker } from "./DateTimePicker";



export interface BolusEntry {
	id: string;
	dose_units: string;
	logged_at: Date;
}


export default function BolusRow({
	entry,
	onChange,
	onRemove,
}: {
	entry: BolusEntry;
	onChange: (e: BolusEntry) => void;
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
					<Text style={styles.inputLabel}>Dose (U)</Text>
					<TextInput
						style={styles.input}
						value={entry.dose_units}
						onChangeText={(v) => onChange({ ...entry, dose_units: v })}
						keyboardType="numeric"
						placeholder="0.0"
						placeholderTextColor="#556"
						maxLength={5}
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
						// Native: tap to open the system picker
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
