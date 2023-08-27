export const CONFIG = {
	env: import.meta.env.NODE_ENV || "development",
	base_url_api: "http://localhost:8000",
	localStorageKey: "carqa-ngoding",
	authorization: {
		username: import.meta.env.AUTHORIZATION_USERNAME || "qwerty",
		passsword: import.meta.env.AUTHORIZATION_PASSWORD || "qwerty2023",
	},
};
