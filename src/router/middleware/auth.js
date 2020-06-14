import authService from "../../api/auth";

export default async function auth({next, store, nextMiddleware}) {
    const res = await authService.isLoggedIn();
    if (!res.data.isLoggedIn) {
        return next({
            name: 'login'
        })
    }

    return nextMiddleware()
}