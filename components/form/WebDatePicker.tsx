export default function WebDatePicker({ value, onChange }: { value: Date; onChange: (d: Date) => void }) {
	const toDateString = (d: Date) => d.toISOString().split("T")[0]; // "YYYY-MM-DD"

	return (
		// @ts-ignore
		<input
			type="date"
			value={toDateString(value)}
			max={toDateString(new Date())}
			onChange={(e: any) => {
				const updated = new Date(value);
				const [y, m, d] = e.target.value.split("-").map(Number);
				updated.setFullYear(y, m - 1, d);
				onChange(updated);
			}}
			style={{
				background: "transparent",
				border: "none",
				outline: "none",
				color: "inherit",
				fontSize: 13,
				fontFamily: "inherit",
				cursor: "pointer",
				textAlign: "right",
			}}
		/>
	);
}