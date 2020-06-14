import authService from "../../api/auth";

export default async function guest({next, store, nextMiddleware}) {
    const res = await authService.isLoggedIn();
    if (res.data.isLoggedIn) {
        return next({
            name: 'home'
        })
    }

    return nextMiddleware()
}