import { Button } from "@material-tailwind/react";
import { IStocks } from "../models/stock";

export interface ITableData {
	tableData: {
		header: string[];
		body: any[][];
	};
	isUseAction?: boolean;
}

const TableStyle = (props: ITableData) => {
	return (
		<div className="relative overflow-x-auto w-full">
			<table className="w-full text-sm text-left text-gray-500 bg-gray-50">
				<thead className="text-xs text-gray-700 uppercase w-full">
					<tr>
						{props.tableData.header.map((item, index) => {
							return (
								<th key={index} scope="col" className="px-6 py-3">
									{item}
								</th>
							);
						})}
					</tr>
				</thead>
				<tbody>
					{props.tableData.body.map((items: IStocks[] | any, index: number) => {
						return (
							<tr
								key={index}
								className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
							>
								{/* {items.map((item : IStocks) =>)} */}
								<td className="px-6 py-4">
									{items[index].namaObat || "_"}
								</td>
								<td className="px-6 py-4">
									{items[index].tglMasuk || "_"}
								</td>
								<td className="px-6 py-4">
									{items[index].tglExpired || "_"}
								</td>
								<td className="px-6 py-4">{items[index].batch || "_"}</td>
								<td className="px-6 py-4">{items[index].stock || "_"}</td>

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
									<Button variant="outlined" size="sm" color="red">
										Hapus
									</Button>
									<Button variant="outlined" size="sm">
										Edit
									</Button>
									<Button variant="outlined" size="sm" color="teal">
										Detail
									</Button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};
export default TableStyle;
