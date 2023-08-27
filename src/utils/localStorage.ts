import { CONFIG } from "../configs/app.config";
import { IUserModel } from "../models/user";

export const getUserFromLocalStorage = () => {
	const user = localStorage.getItem(CONFIG.localStorageKey) || "";
	if (!user) return null;
	const result: IUserModel = JSON.parse(user);
	return result;
};
