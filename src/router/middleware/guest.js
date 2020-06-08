export default function guest({next, store, nextMiddleware}) {
    if (store.getters.auth.loggedIn) {
        return next({
            name: 'home'
        })
    }

    return nextMiddleware()
}