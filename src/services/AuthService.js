import api from '../services/Api'

export default {
	login(params) {
		return api.post("/auth/login", params);
	},

	logout() {
		return api.get("/auth/logout");
	},

	signup(params) {
		return api.post("/auth/register", params)
	}
}
