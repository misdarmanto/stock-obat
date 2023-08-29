import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyBO3luTVd8gNVRs_mejalPddYS8Z6iKKbQ",
	authDomain: "eka-stok-obat.firebaseapp.com",
	projectId: "eka-stok-obat",
	storageBucket: "eka-stok-obat.appspot.com",
	messagingSenderId: "660950766360",
	appId: "1:660950766360:web:389f24eb9b93b6d0d4c46d",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const fireBase = { storage, auth, db };
