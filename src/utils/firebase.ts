import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { auth } from "../configs/firebase.config";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { sendPasswordResetEmail } from "firebase/auth";

interface IFirebaseResetPasswordModel {
	email: string;
}

export const firebaseResetPassword = async (props: IFirebaseResetPasswordModel) => {
	try {
		await sendPasswordResetEmail(auth, props.email);
	} catch (error: any) {
		const errorCode = error.code;
		const errorMessage = error.message;
		throw Error(errorMessage);
	}
};

export const uploadImageToFirebase = async ({ imageRef, file }: any) => {
	const snapshot = await uploadBytesResumable(imageRef, file);
	const url = await getDownloadURL(snapshot.ref);
	return url;
};

export const signOutFirebase = async () => {
	signOut(auth)
		.then(() => {
			// Sign-out successful.
		})
		.catch((error) => {
			// An error happened.
		});
};

export const signInFirebase = async () => {
	const provider = new GoogleAuthProvider();
	signInWithPopup(auth, provider)
		.then((result) => {
			// This gives you a Google Access Token. You can use it to access the Google API.
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential?.accessToken;
			// The signed-in user info.
			const user = result.user;

			console.log(user);
			// ...
		})
		.catch((error) => {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;
			// The email of the user's account used.
			const email = error.email;
			// The AuthCredential type that was used.
			const credential = GoogleAuthProvider.credentialFromError(error);
			// ...
		});
};
