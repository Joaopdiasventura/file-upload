import { useEffect, useState } from "react";
import { useUserContext } from "../contexts/user";
import { app } from "../App";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/header";

export function Index() {
	const navigate = useNavigate();
	const { user, setUser } = useUserContext();

	const [files, setFiles] = useState<any[]>([]);

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

	const getData = async () => {
		if (user) {
			const result = await app
				.get(`/file/getFilesByUser/${user.email}`)
				.then((result) => result.data);
			setFiles(result);
		}
	};

	useEffect(() => {
		verifyUser();
	}, []);

	useEffect(() => {
		getData();
	}, [user]);

	return (
		user && (
			<div className="w-screen h-screen flex flex-col gap-5">
				<Header />
				<div className="w-full flex flex-wrap justify-around gap-2">
					{files.map((file) => (
						<div key={file.id} className="cursor-pointer border w-1/4 my-3 p-2">
							<p className="font-bold text-center">{file.name}</p>
							<table className="table-auto w-full border-collapse border border-gray-200">
								<thead>
									<tr>
										{file.metadata.length > 0 && file.metadata.length > 0
											? Object.keys(file.metadata[0]).map((key) => (
													<th key={key} className="border border-gray-200 px-2 py-1">
														{key}
													</th>
												))
											: Object.keys(file.metadata).map((key) => (
													<th key={key} className="border border-gray-200 px-2 py-1">
														{key}
													</th>
												))}
									</tr>
								</thead>
								<tbody>
									{Array.isArray(file.metadata) ? (
										file.metadata.map((metadataItem: any, index: number) => (
											<tr key={index}>
												{Object.values(metadataItem).map((value: string, idx: number) => (
													<td key={idx} className="border border-gray-200 px-2 py-1">
														{value}
													</td>
												))}
											</tr>
										))
									) : (
										<tr>
											{Object.values(file.metadata).map((value: string, idx) => (
												<td key={idx} className="border border-gray-200 px-2 py-1">
													{value}
												</td>
											))}
										</tr>
									)}
								</tbody>
							</table>
						</div>
					))}
				</div>
			</div>
		)
	);
}
