import { ComponentProps } from "react";

export function TransparentButton(props: ComponentProps<"button">) {
	return (
		<button
			className="bg-transparent border border-white text-white text-xs p-2 rounded-lg font-semibold tracking-tight"
			{...props}
		>
			{props.value}
		</button>
	);
}
