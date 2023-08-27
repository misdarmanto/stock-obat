export interface IUserModel {
	userIsAuth: boolean;
	userId: string;
	userName: string;
	userEmail: string;
	userPhoneNumber?: string | null;
	userProfilePicture?: string | null;
}

export interface IUserRegisterPostRequestModel {
	userId: string;
	userName: string;
	userEmail: string;
	userPassword: string;
	userPhoneNumber?: string | null;
	userProfilePicture?: string | null;
}
