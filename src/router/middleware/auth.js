export default function auth({next, store, nextMiddleware}) {
    if (!store.getters.auth.loggedIn) {
        return next({
            name: 'login'
        })
    }

    return nextMiddleware()
}