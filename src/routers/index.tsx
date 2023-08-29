import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/error-page";
import HomeView from "../pages/home/homeView";
import MyProfileView from "../pages/myProfile/myProfileView";
import MyProfileEditView from "../pages/myProfile/myProfileEditView";
import LoginView from "../pages/auth/loginView";
import { IAppContextModel, useAppContext } from "../context/app.context";
import SignUpView from "../pages/auth/signUpView";
import ResetPasswordView from "../pages/auth/resetPasswordView";
import AppLayout from "../layout/appLayout";
import StockCreateView from "../pages/stock/stockCreateView";
import StockDetailView from "../pages/stock/stockDetailView";
import StockListView from "../pages/stock/stockListView";
import StockEditView from "../pages/stock/stockEditView";

export default function AppRouters() {
	const { currentUser }: IAppContextModel = useAppContext();

	const routerAuth: { path: string; element: JSX.Element }[] = [
		{
			path: "/",
			element: <LoginView />,
		},
		{
			path: "/login",
			element: <LoginView />,
		},
		// {
		// 	path: "/sign-up",
		// 	element: <SignUpView />,
		// },
		// {
		// 	path: "/reset-password",
		// 	element: <ResetPasswordView />,
		// },
	];

	const routerMain: { path: string; element: JSX.Element }[] = [
		{
			path: "/",
			element: <HomeView />,
		},
		{
			path: "/stock",
			element: <StockListView />,
		},
		{
			path: "/stock/create",
			element: <StockCreateView />,
		},
		{
			path: "/stock/detail/:stockId",
			element: <StockDetailView />,
		},
		{
			path: "/stock/edit/:stockId",
			element: <StockEditView />,
		},
		{
			path: "/my-profile",
			element: <MyProfileView />,
		},
		{
			path: "/my-profile/edit",
			element: <MyProfileEditView />,
		},
	];

	let router: { path: string; element: JSX.Element }[] = [];

	if (currentUser.userIsAuth) {
		router = routerMain;
	} else {
		router = routerAuth;
	}

	const routers = createBrowserRouter([
		{
			path: "/",
			element: <AppLayout />,
			errorElement: <ErrorPage />,
			children: router,
		},
	]);

	return <RouterProvider router={routers} />;
}
