import { Platform } from "react-native";


export const DateTimePicker =
	Platform.OS !== "web"
		? require("@react-native-community/datetimepicker").default
		: null;

// Web fallback: a styled HTML <input type="time">
export function WebTimePicker({ value, onChange }: { value: Date; onChange: (d: Date) => void }) {
	const toTimeString = (d: Date) =>
		`${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;

	return (
		// @ts-ignore — 'input' is valid in react-native-web
		<input
			type="time"
			value={toTimeString(value)}
			max={toTimeString(new Date())}
			onChange={(e: any) => {
				const [h, m] = e.target.value.split(":").map(Number);
				const updated = new Date(value);
				updated.setHours(h, m, 0, 0);
				onChange(updated);
			}}
			style={{
				background: "transparent",
				border: "none",
				outline: "none",
				color: "inherit",
				fontSize: 15,
				fontFamily: "monospace",
				width: "100%",
				cursor: "pointer",
			}}
		/>
	);
}