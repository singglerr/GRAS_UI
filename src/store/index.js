import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

function addFieldZeroVal(obj, field) {
    obj[field] = 0;
}

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

            const indexStr = (length - 1).toString();
            for (let row of state.fcm.matrix) {
                row[indexStr] = 0;
            }

            const newRow = {name: payload.item.name};
            for (let i = 0; i < length; i++) {
                newRow[i.toString()] = 0;
            }

            state.fcm.matrix.push(newRow);
        },

        fcmDeleteConcept(state, payload) {
            const index = payload.item.id - 1;
            if (state.fcm.matrix.length !== 0) {
                state.fcm.matrix.splice(index, 1);

                const lastIndex = state.fcm.matrix.length.toString();
                for (let row of state.fcm.matrix) {
                    for (let i = index; i < state.fcm.matrix.length; i++) {
                        row[i.toString()] = row[(i + 1).toString()];
                    }

                    delete row[lastIndex];
                }
            }

            state.fcm.concepts.splice(index, 1);
            for (let i = index; i < state.fcm.concepts.length; i++) {
                state.fcm.concepts[i].id--;
            }
        },

        fcmEditConcept(state, payload) {
            const index = payload.item.id - 1;
            Object.assign(state.fcm.concepts[index], payload.item);
            state.fcm.matrix[index].name = payload.item.name;
        },

        fcmMatrixReset(state) {
            state.fcm.matrix = [];
        },

        dmpAddState(state, payload) {
            state.dmp.states.push(payload.item);
            const length = state.dmp.states.length;
            const lastIndex = length - 1;
            state.dmp.states[lastIndex].id = length;

            if (state.dmp.strategies.length !== 0) {
                const lastIndexStr = lastIndex.toString();
                const newRowProb = {name: payload.item.name};
                const newRowProf = {name: payload.item.name};
                for (let i = 0; i < length; i++) {
                    newRowProb[i.toString()] = 0;
                    newRowProf[i.toString()] = 0;
                }
                newRowProb[lastIndexStr] = 1;

                state.dmp.strategies.forEach(strategy => {
                    strategy.prob.forEach(row => addFieldZeroVal(row, lastIndexStr));
                    strategy.prob.push({...newRowProb});

                    strategy.profit.forEach(row => addFieldZeroVal(row, lastIndexStr));
                    strategy.profit.push({...newRowProf});
                })
            }
        },

        dmpEditState(state, payload) {
            const index = payload.item.id - 1;
            Object.assign(state.dmp.states[index], payload.item);
            state.dmp.strategies.forEach(strategy => {
                strategy.prop[index].name = payload.item.name;
                strategy.profit[index].name = payload.item.name
            });
        },

        dmpDeleteState(state, payload) {
            const index = payload.item.id - 1;
            state.dmp.states.splice(index, 1);
            if (state.dmp.states.length === 0) {
                state.dmp.strategies = [];

                return;
            }

            for (let i = index; i < state.dmp.states.length; i++) {
                state.dmp.states[i].id--;
            }


            if (state.dmp.strategies.length !== 0) {
                const lastIndexStr = state.dmp.strategies[0].prob.length.toString();

                state.dmp.strategies.forEach(strategy => {
                    strategy.prob.splice(index, 1);
                    strategy.profit.splice(index, 1);

                    strategy.prob.forEach(row => {
                        for (let i = index; i < strategy.prob.length; i++) {
                            row[i.toString()] = row[(i + 1).toString()];
                        }

                        delete row[lastIndexStr];
                    });

                    strategy.profit.forEach(row => {
                        for (let i = index; i < strategy.profit.length; i++) {
                            row[i.toString()] = row[(i + 1).toString()];
                        }

                        delete row[lastIndexStr];
                    })
                })
            }
        },

        dmpAddStrategy(state, payload) {
            state.dmp.strategies.push(payload.item);

            const length = state.dmp.strategies.length;
            state.dmp.strategies[length - 1].id = length;
        },

        dmpEditStrategy(state, payload) {
            const index = payload.item.id - 1;
            Object.assign(state.dmp.strategies[index], payload.item);
        },

        dmpDeleteStrategy(state, payload) {
            const index = payload.item.id - 1;
            state.dmp.strategies.splice(index, 1);

            for (let i = index; i < state.dmp.strategies.length; i++) {
                state.dmp.strategies[i].id--;
            }
        },
    }
})