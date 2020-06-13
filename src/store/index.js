import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: {
            name: "",
            email: "",
            loggedIn: false,
        },
        fcm: {
            concepts: [],
            conceptTypes: [
                "целевой",
                "управляемый"
            ],
            conceptGroups: [
                "хрупкие",
                "прехрупкие",
                "крепкие"
            ],
            conceptValues: [
                "низкое",
                "ниже среднего",
                "среднее",
                "выше среднего",
                "высокое"
            ],
            matrix: [],
            staticData: [],
        },
        dmp: {
            states: [],
            strategies: [],

            n: 0,
        },
        lvm: {}
    },

    getters: {
        user(state) {
            return state.user;
        },

        fcmConcepts(state) {
            return state.fcm.concepts;
        }
    },

    mutations: {
        login(state) {
            state.user.loggedIn = true;
        },

        logout(state) {
            state.user.loggedIn = false;
        },

        SET_BAR_IMAGE(state, payload) {
            state.barImage = payload
        },

        SET_DRAWER(state, payload) {
            state.drawer = payload
        },

        fcmAddConcept(state, payload) {
            state.fcm.concepts.push(payload.item);
            const length = state.fcm.concepts.length;
            state.fcm.concepts[length - 1].id = length;

            const index = (length - 1).toString();
            for (let row of state.fcm.matrix) {
                row[index] = 0;
            }

            const newRow = {name: payload.item.name};
            for (let i = 0; i < length; i++) {
                newRow[i.toString()] = 0;
            }

            state.fcm.matrix.push(newRow);
        },

        fcmDeleteConcept(state, payload) {
            if (state.fcm.matrix.length !== 0) {
                state.fcm.matrix.splice(payload.index, 1);
                const lastIndex = (state.fcm.matrix.length - 1).toString();
                for (let row of state.fcm.matrix) {
                    for (let i = payload.index; i < state.fcm.matrix.length - 1; i++) {
                        row[i.toString()] = row[(i + 1).toString()];
                    }

                    delete row[lastIndex];
                }
            }

            state.fcm.concepts.splice(payload.index, 1);
            for (let i = payload.index; i < state.fcm.concepts.length; i++) {
                state.fcm.concepts[i].id--;
            }
        },

        fcmEditConcept(state, payload) {
            Object.assign(state.fcm.concepts[payload.index], payload.item);
            state.fcm.matrix[payload.index].name = payload.item.name;
        },

        fcmMatrixReset(state) {
            state.fcm.matrix = [];
        },

        dmpAddState(state, payload) {
            state.dmp.states.push(payload.item);
            const length = state.dmp.states.length;
            state.dmp.states[length - 1].id = length;

            // const index = (length - 1).toString();
            // for (let row of state.fcm.matrix) {
            //     row[index] = 0;
            // }
            //
            // const newRow = {name: payload.item.name};
            // for (let i = 0; i < length; i++) {
            //     newRow[i.toString()] = 0;
            // }
            //
            // state.fcm.matrix.push(newRow);
        },

        dmpEditState(state, payload) {
            const index = state.dmp.states.indexOf(payload.item);
            Object.assign(state.dmp.states[index], payload.item);
            // state.fcm.matrix[payload.index].name = payload.item.name;
        },

        dmpDeleteState(state, payload) {
            const index = state.dmp.states.indexOf(payload.item);
            // if (state.fcm.matrix.length !== 0) {
            //     state.fcm.matrix.splice(payload.index, 1);
            //     for (let row of state.fcm.matrix) {
            //         delete row[index.toString()];
            //     }
            // }

            state.dmp.states.splice(index, 1);
            for (let i = index; i < state.dmp.states.length; i++) {
                state.dmp.states[i].id--;
            }
        },
    }
})