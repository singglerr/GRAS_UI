import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {
            name: "",
            email: "",
            loggedIn: false,
        }
    },

    getters: {
        user(state) {
            return state.user
        }
    },

    mutations: {
        login(state) {
            state.user.loggedIn = true;
        },

        logout(state) {
            state.user.loggedIn = false;
        }
    }
})