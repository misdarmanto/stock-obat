export interface HttpParam {
	showMessage?: boolean;
	token?: string;
	query?: any;
	method?: "get" | "post" | "put" | "patch" | "delete";
	path?: string;
	data?: any;
	content_type?: string;
	responseType?: string;
}
