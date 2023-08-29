import { useState } from "react";
import { Breadcrumb } from "../../components/breadCumber";
import MainLayout from "../../layout/mainLayout";
import { Collections, firebaseCRUD } from "../../firebase/firebaseFunctions";
import { useNavigate } from "react-router-dom";
import { IAppContextModel, useAppContext } from "../../context/app.context";
import { IStock } from "../../models/stock";

const StockCreateView = () => {
	const navigation = [{ title: "Create", href: "", active: true }];
	const navigate = useNavigate();

	const [namaObat, setnamaObat] = useState("");
	const [tglMasuk, setTglMasuk] = useState("");
	const [namaBPF, setNamaBPF] = useState("");
	const [tglExpired, setTglExpired] = useState("");
	const [batch, setBatch] = useState("");
	const [total, setTotal] = useState<number>(0);

	const { setErrorApp }: IAppContextModel = useAppContext();

	const handleSubmit = async () => {
		try {
			const checkField =
				namaObat === "" ||
				namaBPF === "" ||
				tglMasuk === "" ||
				tglExpired === "" ||
				batch === "" ||
				total === 0;

			if (checkField) {
				throw Error("mohon lengkapi semua data");
			}
			const payload: IStock = {
				namaObat,
				namaBPF,
				tglMasuk,
				tglExpired,
				batch,
				total,
				stock: total,
			};

			await firebaseCRUD.createData({
				collectionName: Collections.STOCKS,
				data: payload,
			});

			navigate("/stock");
		} catch (error: any) {
			setErrorApp({ isError: true, message: error.message });
		}
	};

	return (
		<MainLayout>
			<Breadcrumb title={"Stok Obat"} navigation={navigation} />
			<div className="bg-white rounded p-5 sm:p-10">
				<div className="sm:my-6 flex flex-col sm:flex-row gap-5">
					<div className="w-full sm:w-1/2">
						<label className="block mb-2 text-sm font-medium text-gray-900">
							Nama Obat
						</label>
						<input
							type="text"
							value={namaObat}
							onChange={(e) => setnamaObat(e.target.value)}
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
							required
							placeholder="nama obat..."
						/>
					</div>
					<div className="w-full sm:w-1/2">
						<label className="block mb-2 text-sm font-medium text-gray-900">
							Tgl Masuk
						</label>
						<input
							type="date"
							value={tglMasuk}
							onChange={(e) => setTglMasuk(e.target.value)}
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
							required
						/>
					</div>
				</div>
				<div className="sm:my-6 flex flex-col sm:flex-row gap-5">
					<div className="w-full sm:w-1/2">
						<label className="block mb-2 text-sm font-medium text-gray-900">
							Nama PBF
						</label>
						<input
							type="text"
							value={namaBPF}
							onChange={(e) => setNamaBPF(e.target.value)}
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
							required
							placeholder="nama BPF..."
						/>
					</div>
					<div className="w-full sm:w-1/2">
						<label className="block mb-2 text-sm font-medium text-gray-900">
							Tgl Expired
						</label>
						<input
							type="date"
							value={tglExpired}
							onChange={(e) => setTglExpired(e.target.value)}
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
							required
						/>
					</div>
				</div>
				<div className="sm:my-6 flex flex-col sm:flex-row gap-5">
					<div className="w-full sm:w-1/2">
						<label className="block mb-2 text-sm font-medium text-gray-900">
							Batch
						</label>
						<input
							type="text"
							value={batch}
							onChange={(e) => setBatch(e.target.value)}
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
							required
							placeholder="nomor batch..."
						/>
					</div>
					<div className="w-full sm:w-1/2">
						<label className="block mb-2 text-sm font-medium text-gray-900">
							Jumlah
						</label>
						<input
							type="number"
							min={0}
							value={total}
							onChange={(e) => setTotal(+e.target.value)}
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
							required
						/>
					</div>
				</div>
				<div className="flex flex-row justify-end mt-5 sm:mt-2">
					<button
						type="button"
						onClick={handleSubmit}
						className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-3 border border-blue-500 hover:border-transparent rounded"
					>
						Submit
					</button>
				</div>
			</div>
		</MainLayout>
	);
};

export default StockCreateView;
