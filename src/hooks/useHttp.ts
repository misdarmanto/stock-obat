import { CONFIG } from "../configs/app.config";
import { IAppContextModel, useAppContext } from "../context/app.context";
import { ServiceHttp } from "../services/api";

interface IPathModel {
	path: string;
}

interface PostRequestTypes extends IPathModel {
	body: any;
	header?: any;
}

interface GetRequestTypes extends IPathModel {
	header?: any;
}

interface RemoveRequestTypes extends IPathModel {
	body?: any;
	header?: any;
}

interface UpdateRequestTypes extends IPathModel {
	body: any;
	header?: any;
}

interface GetTabelDataRequestTypes extends IPathModel {}

export interface HttpRequestTypes {
	handleGetRequest: (value: GetRequestTypes) => void;
	handlePostRequest: (value: PostRequestTypes) => void;
	handleRemoveRequest: (value: RemoveRequestTypes) => void;
	handleGetTableDataRequest: (value: GetTabelDataRequestTypes) => void;
}

export const useHttp = () => {
	const { setErrorApp }: IAppContextModel = useAppContext();
	const httpService = new ServiceHttp();

	const handleGetRequest = async ({ path, header }: GetRequestTypes) => {
		try {
			const result = await httpService.get({
				path,
				header,
			});
			return result;
		} catch (error: any) {
			console.error(error.message);
			setErrorApp({ isError: true, message: error.message });
		}
	};

	const handlePostRequest = async ({ path, body, header }: PostRequestTypes) => {
		try {
			const result = await httpService.post({
				path,
				body,
				header,
			});
			return result;
		} catch (error: any) {
			console.error(error.message);
			setErrorApp({ isError: true, message: error.message });
		}
	};

	const handleRemoveRequest = async ({ path, body, header }: RemoveRequestTypes) => {
		try {
			const result = await httpService.remove({
				path,
				header,
			});
			return result;
		} catch (error: any) {
			console.error(error.message);
			setErrorApp({ isError: true, message: error.message });
		}
	};

	const handleUpdateRequest = async ({ path, body, header }: UpdateRequestTypes) => {
		try {
			const result = await httpService.patch({
				path,
				body,
				header,
			});
			return result;
		} catch (error: any) {
			console.error(error.message);
			setErrorApp({ isError: true, message: error.message });
		}
	};

	const handleGetTableDataRequest = async ({ path }: GetTabelDataRequestTypes) => {
		try {
			const result = await httpService.getTableData({
				url: CONFIG.base_url_api + path,
				pagination: true,
				page: 0,
				size: 10,
				filters: {
					search: "",
				},
			});
			return result;
		} catch (error: any) {
			console.error(error.message);
			setErrorApp({ isError: true, message: error.message });
		}
	};

	return {
		handleGetRequest,
		handlePostRequest,
		handleRemoveRequest,
		handleUpdateRequest,
		handleGetTableDataRequest,
	};
};
