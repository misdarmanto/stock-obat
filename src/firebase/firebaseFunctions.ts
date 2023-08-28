import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { fireBase } from "../configs/firebase.config";

interface IFireBaseCreateData {
	collectionName: string;
	data: any;
}

export enum Collections {
	STOCKS = "STOCKS",
	USERS = "USERS",
}

const createData = async ({ collectionName, data }: IFireBaseCreateData) => {
	try {
		const stokObatRef = doc(collection(fireBase.db, collectionName));
		await setDoc(stokObatRef, data);
	} catch (error: any) {
		throw Error(error.message);
	}
};

const getCollectionData = async ({ collectionName }: { collectionName: string }) => {
	try {
		const result: any = [];
		const querySnapshot = await getDocs(collection(fireBase.db, collectionName));
		querySnapshot.forEach((doc) => {
			result.push({ ...doc.data(), id: doc.id });
		});
		return result;
	} catch (error: any) {
		throw Error(error.message);
	}
};

export const firebaseCRUD = {
	createData,
	getCollectionData,
};
