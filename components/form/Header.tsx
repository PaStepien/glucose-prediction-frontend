import { useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../screens/form/Form";
import { DateTimePicker } from "./DateTimePicker";
import WebDatePicker from "./WebDatePicker";


export default function FormHeader({
	date,
	onChange,
}: {
	date: Date;
	onChange: (d: Date) => void;
}) {
	const [showPicker, setShowPicker] = useState(false);

	const handleNativeChange = (_event: any, selected?: Date) => {
		if (Platform.OS === "android") setShowPicker(false);
		if (selected) onChange(selected);
	};

	const formattedDate = date.toLocaleDateString([], {
		weekday: "long",
		month: "short",
		day: "numeric",
	});

	return (
		<>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Log Entry</Text>

				{Platform.OS === "web" ? (
					<View style={styles.headerDateBox}>
						<WebDatePicker value={date} onChange={onChange} />
					</View>
				) : (
					<TouchableOpacity
						style={styles.headerDateBox}
						onPress={() => setShowPicker(true)}
						activeOpacity={0.7}
					>
						<Text style={styles.headerDateText}>{formattedDate}</Text>
						<Text style={styles.headerDateEdit}>✎</Text>
					</TouchableOpacity>
				)}
			</View>

			{Platform.OS !== "web" && showPicker && (
				<>
					<DateTimePicker
						value={date}
						mode="date"
						display={Platform.OS === "ios" ? "spinner" : "default"}
						onChange={handleNativeChange}
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
		</>
	);
}