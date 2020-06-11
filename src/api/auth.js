import api from './config'

export default {
	login(params) {
		return api.post("/api/auth/login", params);
	},

	logout() {
		return api.get("/api/auth/logout");
	},

	signup(params) {
		return api.post("/api/auth/register", params)
	},

	isLoggedIn() {
		return api.get("/api/auth/loggedIn")
	}
}
