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
					{props.tableData.body.map((items: string[], index: number) => {
						return (
							<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
								{items.map((item: string, key: number) => {
									return (
										<td key={key} className="px-6 py-4">
											{item}
										</td>
									);
								})}
								<td className="px-6 py-4">Hapus</td>
								<td className="px-6 py-4">Edit</td>
								<td className="px-6 py-4">Detail</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};
export default TableStyle;
