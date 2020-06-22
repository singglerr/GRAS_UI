import Vue from 'vue'
import Router from 'vue-router'
import store from "../store"

import guest from "./middleware/guest"
import auth from "./middleware/auth"
import middlewarePipeline from "./middlewarePipeline";

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: "/",
            component: () => import("../views/Home"),
            name: "home",
            meta: {
                middleware: [
                    auth
                ]
            },
        },
        {
            path: "/login",
            name: "login",
            component: () => import("../views/auth/Login"),
            meta: {
                middleware: [
                    guest
                ]
            }
        },
        {
            path: "/register",
            name: "register",
            component: () => import("../views/auth/Register"),
            meta: {
                middleware: [
                    guest
                ]
            }
        },
        {
            path: "/modules/risk/",
            component: () => import("../views/risk-module/RiskModule"),
            name: "risk-module",
            meta: {
                middleware: [
                    auth
                ],
            },
            children: [
                {
                    path: "",
                    component: () => import("../views/risk-module/Info"),
                    name: "Info",
                    meta: {
                        middleware: [
                            auth
                        ],
                    },
                },
                {
                    path: "lvm",
                    component: () => import("../views/risk-module/lvm/LVM"),
                    name: "LVM",
                    meta: {
                        middleware: [
                            auth
                        ],
                    },
                    children: [
                        {
                            path: "",
                            name: "Scenario",
                            component: () => import("../views/risk-module/lvm/Scenario"),
                            meta: {
                                middleware: [
                                    auth,
                                ],
                            }
                        }
                    ]
                },
                {
                    path: "dmp",
                    component: () => import("../views/risk-module/dmp/DMP"),
                    name: "DMP",
                    meta: {
                        middleware: [
                            auth
                        ],
                    },
                    children: [
                        {
                            path: "",
                            redirect: "states",
                            meta: {
                                middleware: [
                                    auth
                                ],
                            },
                        },
                        {
                            path: "states",
                            name: "dmp/states",
                            component: () => import("../views/risk-module/dmp/States"),
                            meta: {
                                middleware: [
                                    auth
                                ],
                            },
                        },
                        {
                            path: "strategies",
                            name: "dmp/strategies",
                            component: () => import("../views/risk-module/dmp/Strategies"),
                            meta: {
                                middleware: [
                                    auth
                                ],
                            },
                        },
                        {
                            path: "model",
                            name: "dmp/model",
                            component: () => import("../views/risk-module/dmp/Model"),
                            meta: {
                                middleware: [
                                    auth
                                ],
                            },
                        },
                    ]
                },
                {
                    path: "fcm",
                    component: () => import("../views/risk-module/fcm/FCM"),
                    name: "FCM",
                    children: [
                        {
                            path: "",
                            redirect: "concepts",
                            meta: {
                                middleware: [
                                    auth
                                ],
                            },
                        },
                        {
                            path: "concepts",
                            name: "fcm/concept",
                            component: () => import("../views/risk-module/fcm/Concepts"),
                            meta: {
                                middleware: [
                                    auth
                                ],
                            },
                        },
                        {
                            path: "matrix",
                            name: "fcm/matrix",
                            component: () => import("../views/risk-module/fcm/InfluenceMatrix"),
                            meta: {
                                middleware: [
                                    auth
                                ],
                            },
                        },
                        {
                            path: "graph",
                            name: "fcm/graph",
                            component: () => import("../views/risk-module/fcm/Graph"),
                            meta: {
                                middleware: [
                                    auth
                                ],
                            },
                        },
                        {
                            path: "static",
                            name: "fcm/static",
                            component: () => import("../views/risk-module/fcm/StaticMod"),
                            meta: {
                                middleware: [
                                    auth
                                ],
                            },
                        },
                        // {
                        //     path: "dynamic",
                        //     name: "fcm/dynamic",
                        //     component: () => import("../views/risk-module/fcm/DynamicMod"),
                        //     meta: {
                        //         middleware: [
                        //             auth
                        //         ],
                        //     },
                        // }
                    ]
                }
            ]
        },
        {
            path:"/modules/promethee/",
            component:()=>import("../views/Promethee-module/PrometheeModule"),
            name:"promethee-module",
            meta: {
                middleware: [
                    auth
                ],
            },
            children: [
                {
                    path: "",
                    component: () => import("../views/Promethee-module/Promethee"),
                    name: "promethee-2",
                    meta: {
                        middleware: [
                            auth
                        ],
                    },
                },
            ]
        },
        {
            path:"/modules/kini-raif/",
            component:()=>import("../views/kini-raif/KR_Module"),
            name:"kr_-module",
            meta: {
                middleware: [
                    auth
                ],
            },
            children: [
                {
                    path: "",
                    component: () => import("../views/kini-raif/Kini-Raif"),
                    name: "kini_raif",
                    meta: {
                        middleware: [
                            auth
                        ],
                    },
                },
            ]
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (!to.meta.middleware) {
        return next()
    }

    const middleware = to.meta.middleware;
    const context = {
        to,
        from,
        next,
        store
    };

    return middleware[0]({
        ...context,
        nextMiddleware: middlewarePipeline(context, middleware, 1)
    })
});

export default router
