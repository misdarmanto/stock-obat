import { useEffect } from "react";
import { IAppContextModel, useAppContext } from "./context/app.context";
import AppRouters from "./routers";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./configs/firebase.config";
import { Spinner } from "@material-tailwind/react";
import { IUserModel } from "./models/user";

export default function App() {
	const { setCurrentUser, setIsLoading, isLoading }: IAppContextModel = useAppContext();

	useEffect(() => {
		setIsLoading(true);
		onAuthStateChanged(auth, async (user) => {
			console.log("___________record__________");
			if (user) {
				const payload: IUserModel = {
					userIsAuth: true,
					userId: user.uid,
					userName: user?.displayName || "Admin",
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

	return <AppRouters />;
}
