import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
	const error: any = useRouteError();
	console.error(error);

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-md">
				<h1 className="text-3xl font-semibold mb-4">Oops! Terjadi Kesalahan</h1>
				<p className="text-gray-500 mb-6">
					Maaf, halaman yang Anda cari tidak ditemukan.
				</p>
				<button
					className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-blue-400"
					onClick={() => window.location.reload()}
				>
					Coba Lagi
				</button>
				<button className="bg-blue-500 mx-2 sm:mx-5 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-blue-400">
					<Link to={"/"}>Kembali ke Home</Link>
				</button>
			</div>
		</div>
	);
}
