import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { fireBase } from "../configs/firebase.config";

interface IFireBaseCreateData {
	collectionName: string;
	data: any;
}

interface IFireBaseGetDocumentData {
	collectionName: string;
	documentId: string;
}

interface IFireBaseUpdateDocumentData extends IFireBaseGetDocumentData {
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

const getDocumentData = async (props: IFireBaseGetDocumentData) => {
	try {
		const docRef = doc(fireBase.db, props.collectionName, props.documentId);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			console.log("Document data:", docSnap.data());
			return docSnap.data();
		}
		return null;
	} catch (error: any) {
		throw Error(error.message);
	}
};

const updateDocumentData = async (props: IFireBaseUpdateDocumentData) => {
	const docRef = doc(fireBase.db, props.collectionName, props.documentId);
	await updateDoc(docRef, props.data);
};

export const firebaseCRUD = {
	createData,
	getCollectionData,
	getDocumentData,
	updateDocumentData,
};
