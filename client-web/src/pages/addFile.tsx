import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { app } from "../App";
import { useUserContext } from "../contexts/user";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/header";
import { EnterInput } from "../components/enterInput";

interface CsvRow {
	[key: string]: string;
}

export function AddFile() {
	const [metadata, setMetaData] = useState<CsvRow[]>([]);
	const [name, setName] = useState<string>("");

	const navigate = useNavigate();
	const { user, setUser } = useUserContext();

	const verifyUser = async () => {
		if (!user) {
			const token = localStorage.getItem("token");
			if (token) {
				const result = await app
					.get("/user/decode/" + token)
					.then((result) => result.data);
				setUser(result);
			} else {
				navigate("enter");
			}
		}
	};

	const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		setName(`${file?.name}`);

		if (file && file.type === "text/csv") {
			const reader = new FileReader();
			reader.onload = (e: ProgressEvent<FileReader>) => {
				const text = e.target?.result as string;
				processCSV(text);
			};
			reader.readAsText(file);
		} else {
			alert("Por favor, selecione um arquivo CSV.");
		}
	};

	const processCSV = (csv: string) => {
		while (csv.includes(";;")) {
			csv = csv.replace(/;;/g, ";");
		}
		while (csv.includes(",,")) {
			csv = csv.replace(/,,/g, ",");
		}

		const lines = csv.split("\n");
		const headers = csv.includes(";") ? lines[0].split(";") : lines[0].split(",");
		const rows = lines.slice(1).map((line) => {
			const values = csv.includes(";") ? line.split(";") : line.split(",");
			const row: CsvRow = headers.reduce((acc, header, index) => {
				acc[header.trim()] = values[index]?.trim();
				return acc;
			}, {} as CsvRow);
			return row;
		});

		const filteredRows = rows.filter((row) => {
			return Object.values(row).every(
				(value) => value !== undefined && value.trim().length > 0,
			);
		});

		setMetaData(filteredRows);
	};

	const postFile = async (e: FormEvent) => {
		e.preventDefault();
		try {
			await app
				.post("/file", { name, metadata, user: `${user.email}` })
				.then((result) => result.data);
			alert("Arquivo enviado com sucesso");
			navigate("/");
		} catch (error: any) {
			alert(error.response.data.message);
		}
	};

	useEffect(() => {
		verifyUser();
	}, []);

	return (
		<div className="w-full h-full">
			<Header />
			<form onSubmit={postFile}>
				<EnterInput type="file" accept=".csv" onChange={handleFileUpload} /> <br />
				<EnterInput
					type="submit"
					value="ENVIAR"
					className="border rounded p-1 border-black"
				/>
			</form>
			<table>
				<thead>
					<tr>
						{metadata.length > 0 &&
							Object.keys(metadata[0]).map((key, index) => <th key={index}>{key}</th>)}
					</tr>
				</thead>
				<tbody>
					{metadata.map((row, index) => (
						<tr key={index}>
							{Object.values(row).map((value, i) => (
								<td key={i}>{value}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
