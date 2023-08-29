import TableStyle from "../../components/tableStyle";
import MainLayout from "../../layout/mainLayout";
import { Breadcrumb } from "../../components/breadCumber";
import { Link } from "react-router-dom";
import { IAppContextModel, useAppContext } from "../../context/app.context";
import { Collections, firebaseCRUD } from "../../firebase/firebaseFunctions";
import { useEffect, useState } from "react";
import { IStock } from "../../models/stock";

const StockListView = () => {
	const navigation = [{ title: "Daftar Obat", href: "", active: true }];
	const { setErrorApp }: IAppContextModel = useAppContext();
	const [stockList, setStockList] = useState<IStock[]>([]);

	const tableData = {
		header: [
			"nama",
			"tgl masuk",
			"expired",
			"batch",
			"Stok",
			"update stok",
			"Action",
		],
		body: [stockList],
	};

	const getStokObat = async () => {
		try {
			const result = await firebaseCRUD.getCollectionData({
				collectionName: Collections.STOCKS,
			});
			setStockList(result);
		} catch (error: any) {
			setErrorApp({ isError: true, message: error.message });
		}
	};

	useEffect(() => {
		getStokObat();
	}, []);

	if (stockList.length === 0) return <div>loading...</div>;

	return (
		<MainLayout>
			<Breadcrumb title={"Stok Obat"} navigation={navigation} />
			<div className="flex flex-col gap-2 md:flex-row justify-between mb-5 md:px-0">
				<div className="flex flex-row flex-wrap gap-2">
					<Link to={"/stock/create"}>
						<button
							type="button"
							className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-3 border border-blue-500 hover:border-transparent rounded"
						>
							Tambah Data
						</button>
					</Link>
					<div>
						<button
							type="button"
							className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-3 border border-blue-500 hover:border-transparent rounded"
						>
							Download
						</button>
					</div>
				</div>
				<div className="w-full  md:w-1/5">
					<input
						name="search"
						className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
						placeholder="Cari data"
						type="text"
					/>
				</div>
			</div>
			<TableStyle tableData={tableData} />
		</MainLayout>
	);
};

export default StockListView;
