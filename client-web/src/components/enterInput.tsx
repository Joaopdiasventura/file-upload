import { ComponentProps } from "react";

export function EnterInput(props: ComponentProps<"input">) {
	return (
		<input
			className="bg-white/10 border border-zinc-400 m-2 py-2 px-4 text-sm rounded-lg w-full outline-none text-black max-w-72"
			required
			{...props}
		/>
	);
}
