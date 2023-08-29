import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app";
import { AppProvider } from "./context/app.context";
import { ThemeProvider } from "@material-tailwind/react";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<ThemeProvider>
			<AppProvider>
				<App />
			</AppProvider>
		</ThemeProvider>
	</React.StrictMode>
);
