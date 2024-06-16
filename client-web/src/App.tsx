import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Index } from "./pages";
import { UserProvider } from "./contexts/user";
import { Enter } from "./pages/enter";
import { AddFile } from "./pages/addFile";

export const app = axios.create({ baseURL: import.meta.env.VITE_API_URL });

export function App() {
	return (
		<UserProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Index />}></Route>
					<Route path="/enter" element={<Enter />}></Route>
					<Route path="/addFile" element={<AddFile />}></Route>
				</Routes>
			</BrowserRouter>
		</UserProvider>
	);
}
