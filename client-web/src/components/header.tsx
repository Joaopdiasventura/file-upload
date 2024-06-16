import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/user";
import { TransparentButton } from "./transparentBuutton";

export function Header() {
	const { user } = useUserContext();
	const navigate = useNavigate();

	return (
		<header className="bg-green-700 flex flex-row px-5 py-2 h-16 w-full justify-between text-white uppercase items-center">
			<div className="flex flex-row items-center gap-3">
				<h1
					className="cursor-pointer"
					onClick={() => {
						navigate("/");
					}}
				>
					Olá {user ? user.name : ""}
				</h1>
				<TransparentButton
					value="CRIAR ARQUIVO"
					onClick={() => {
						navigate("/addFile");
					}}
				/>
			</div>

			<TransparentButton
				value="TROCAR DE CONTA"
				onClick={() => {
					navigate("enter");
				}}
			/>
		</header>
	);
}
