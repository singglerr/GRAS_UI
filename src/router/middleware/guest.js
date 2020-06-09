export default function guest({next, store, nextMiddleware}) {
    if (store.getters.user.loggedIn) {
        return next({
            name: 'home'
        })
    }

    return nextMiddleware()
}