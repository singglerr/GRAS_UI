import Vue from 'vue'
import Router from 'vue-router'
import store from "../store"

import Home from '../components/Home'
import Login from "../components/Auth/Login"
import Register from "../components/Auth/Register"
import RiskModule from "../components/RiskModule";

import guest from "./middleware/guest"
import auth from "./middleware/auth"
import middlewarePipeline from "./middlewarePipeline";

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: "/",
            component: Home,
            name: "home",
            meta: {
                middleware: [
                    auth
                ]
            }
        },
        {
            path: "/login",
            name: "login",
            component: Login,
            meta: {
                middleware: [
                    guest
                ]
            }
        },
        {
            path: "/register",
            name: "register",
            component: Register,
            meta: {
                middleware: [
                    guest
                ]
            }
        },
        {
            path: "/modules/risk",
            component: RiskModule,
            name: "risk-module",
            meta: {
                middleware: [
                    auth
                ],
                layout: "module",
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (!to.meta.middleware) {
        return next()
    }

    const middleware = to.meta.middleware
    const context = {
        to,
        from,
        next,
        store
    }

    return middleware[0]({
        ...context,
        nextMiddleware: middlewarePipeline(context, middleware, 1)
    })
})

export default router
