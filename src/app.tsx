import { useEffect } from "react";
import { IAppContextModel, useAppContext } from "./context/app.context";
import AppRouters from "./routers";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./configs/firebase.config";
import { Alert, Spinner } from "@material-tailwind/react";
import { IUserModel } from "./models/user";
import { useNavigate } from "react-router-dom";

export default function App() {
	const {
		setCurrentUser,
		setIsLoading,
		isLoading,
		errorApp,
		setErrorApp,
	}: IAppContextModel = useAppContext();

	useEffect(() => {
		setIsLoading(true);
		onAuthStateChanged(auth, async (user) => {
			if (user) {
				const payload: IUserModel = {
					userIsAuth: true,
					userId: user.uid,
					userName: user?.displayName || "",
					userEmail: user.email || "",
					userProfilePicture: user.photoURL,
				};
				setCurrentUser(payload);
			}
		});
		setIsLoading(false);
	}, []);

	if (isLoading) {
		return (
			<div className="flex flex-row h-screen items-center justify-center gap-2">
				<Spinner color="blue" className="h-12 w-12" /> Loading...
			</div>
		);
	}

	if (errorApp.isError) {
		return (
			<Alert
				open={true}
				color="red"
				className="absolute bottom-24 z-index-20 right-5 w-96"
				onClose={() => setErrorApp({ isError: false, message: "" })}
				animate={{
					mount: { y: 0 },
					unmount: { y: 100 },
				}}
			>
				{errorApp.message || "Error! terjadi kendala"}
			</Alert>
		);
	}

	return <AppRouters />;
}
