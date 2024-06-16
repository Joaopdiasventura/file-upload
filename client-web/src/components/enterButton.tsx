import { ComponentProps } from "react";

export function EnterButton(props: ComponentProps<"button">) {
	return (
		<button
			className="bg-[#009700] text-white text-xs py-2 px-12 border-none rounded-lg font-semibold tracking-tight uppercase mt-2 cursor-pointer"
			{...props}
		>
			{props.value}
		</button>
	);
}
