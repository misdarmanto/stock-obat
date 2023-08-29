import { Button } from "@material-tailwind/react";
import { IStock } from "../models/stock";
import { Link } from "react-router-dom";
import { Collections, firebaseCRUD } from "../firebase/firebaseFunctions";
import { IAppContextModel, useAppContext } from "../context/app.context";
import { useEffect, useState } from "react";
import { ModalStyle } from "./modal";

export interface ITableData {
	tableData: {
		header: string[];
		body: any[][];
	};
	isUseAction?: boolean;
}

const TableStyle = (props: ITableData) => {
	const [tableBody, setTableBody] = useState<IStock[]>([])
	const [openModalDelete, setOpenModalDelete] = useState(false);
	const { setErrorApp }: IAppContextModel = useAppContext();

	useEffect(() => {
		const data : IStock[] = []
		props.tableData.body.forEach((items: any) => {
			data.push(...items);
		});
		setTableBody(data)
	}, [])

	const handleDelete = async (documentId: string) => {
		try {
			await firebaseCRUD.deleteDocumentData({
				collectionName: Collections.STOCKS,
				documentId: documentId,
			});
			setTableBody( tableBody.filter((item) => item.id !== documentId))
		} catch (error: any) {
			setErrorApp({ isError: true, message: error.message });
		}
	};

	return (
		<div className="relative overflow-x-auto w-full">
			<table className="w-full text-sm text-left text-gray-500 bg-gray-50">
				<thead className="text-xs text-gray-700 uppercase w-full">
					<tr>
						{props.tableData.header.map((item, index) => {
							return (
								<th
									key={index}
									scope="col"
									className="px-6 py-3"
								>
									{item}
								</th>
							);
						})}
					</tr>
				</thead>
				<tbody>
					{tableBody.length !== 0 && tableBody.map((item: IStock, index: number) => (
						<tr
							key={index}
							className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
						>
							<td className="px-6 py-4">
								{item.namaObat || "_"}
							</td>
							<td className="px-6 py-4">
								{item.tglMasuk || "_"}
							</td>
							<td className="px-6 py-4">
								{item.tglExpired || "_"}
							</td>
							<td className="px-6 py-4">{item.batch || "_"}</td>
							<td className="px-6 py-4">{item.stock || "_"}</td>

							<td className="px-6 py-4 ">
								<Button
									variant="outlined"
									size="sm"
									color="blue-gray"
								>
									Update
								</Button>
							</td>
							<td className="px-6 py-4 flex flex-row gap-2">
								<Button
									variant="outlined"
									size="sm"
									color="red"
									onClick={() => setOpenModalDelete(true)}
								>
									Hapus
								</Button>
								<Link to={`/stock/edit/${item.id}`}>
									<Button variant="outlined" size="sm">
										Edit
									</Button>
								</Link>
								<Link to={`/stock/detail/${item.id}`}>
									<Button
										variant="outlined"
										size="sm"
										color="teal"
									>
										Detail
									</Button>
								</Link>
							</td>

							<ModalStyle
								title="Warning!"
								body="apakah anda yakin ingin menghapus obat ini?"
								onNo={() => null}
								onYes={() => handleDelete(item?.id|| "" )}
								open={openModalDelete}
								setOpen={setOpenModalDelete}
							/>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
export default TableStyle;
