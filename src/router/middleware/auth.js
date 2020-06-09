export default function auth({next, store, nextMiddleware}) {
    if (!store.getters.user.loggedIn) {
        return next({
            name: 'login'
        })
    }

    return nextMiddleware()
}