import { Link } from "react-router-dom";
import { IAppContextModel, useAppContext } from "../../context/app.context";
import MainLayout from "../../layout/mainLayout";

const MyProfileView = () => {
	const { currentUser }: IAppContextModel = useAppContext();

	return (
		<MainLayout>
			<div className="ml-0 md:ml-4 mt-4 md:mt-0 bg-white rounded-xl p-5 sm:p-10">
				<div className="flex gap-5 items-center my-5">
					<h3 className="text-lg font-semibold">Nama : </h3>
					<p className="text-gray-800">{currentUser.userName}</p>
				</div>
				<div className="flex gap-5 items-center my-5">
					<h3 className="text-lg font-semibold">Email : </h3>
					<p className="text-gray-800">{currentUser.userEmail}</p>
				</div>

				{/* <div className="flex justify-end mt-4">
					<Link to={"/edit-my-profile"}>
						<button
							type="submit"
							className="inline-flex justify-center w-32 rounded-md border border-transparent shadow-sm px-4 py-2 bg-teal-600 text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:text-sm"
						>
							Edit
						</button>
					</Link>
				</div> */}
			</div>
		</MainLayout>
	);
};

export default MyProfileView;
