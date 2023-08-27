import { useState } from "react";

export default function useToken() {
	const LOCAL_STORAGE_KEY = "simerdeka";
	const getToken = () => {
		const tokenString = localStorage.getItem(LOCAL_STORAGE_KEY);
		if (tokenString) {
			return tokenString;
		} else {
			return null;
		}
	};

	const [token, setToken] = useState<string | null>(getToken());

	const saveToken = (userToken: string) => {
		localStorage.setItem(LOCAL_STORAGE_KEY, userToken);
		setToken(userToken);
	};

	const removeToken = () => {
		localStorage.removeItem(LOCAL_STORAGE_KEY);
	};

	return {
		setToken: saveToken,
		token,
		removeToken,
		getToken,
	};
}
