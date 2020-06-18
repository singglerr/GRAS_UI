import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

function addFieldZeroVal(obj, field) {
    obj[field] = 0;
}

//TODO refactor LVM

const buildFAL = tree => {
    if (tree.children.length == 0) {
        return 'x' + tree.id;
    }

    let fals = [];
    for (let i in tree.children) {
        let cur = buildFAL(tree.children[i]);
        if (cur.indexOf(' ') == -1) {
            fals.push(cur);
        } else {
            fals.push(`(${cur})`);
        }
    }

    return fals.join(tree.func == 'AND' ? ' \u2227 ' : ' \u2228 ');
};

const buildPF = tree => {
    if (tree.children.length == 0) {
        return 'x' + tree.id;
    }

    let fals = [];
    for (let i in tree.children) {
        let cur = buildPF(tree.children[i]);
        if (cur.indexOf(' ') == -1) {
            fals.push(cur);
        } else {
            fals.push(`(${cur})`);
        }
    }

    let res = '';
    if (tree.func == 'AND') {
        res = fals.join('');
    } else {
        for (let i in fals) {
            res += `(1 - ${fals[i]})`
        }

        res = `1 - ${res}`
    }

    return res;
};

const or = arr => {
    let sum = 1;
    arr.forEach(el => {
        sum *= 1 - el;
    });
    return 1 - sum;
};

const and = arr => {
    return arr.reduce((a, b) => a * b, 1);
};

const fals = {
    or: or,
    and: and
};

const calc = tree => {
    if (tree.children.length != 0) {
        let losses = [];
        let probs = [];
        for (let i in tree.children) {
            let res = calc(tree.children[i]);
            losses.push(res[0]);
            probs.push(res[1]);
        }

        tree.losses = fals[tree.func.toLowerCase()](losses);
        tree.prob = fals[tree.func.toLowerCase()](probs);
    }

    return [tree.losses, tree.prob];
};

function myBuild(tree, nodes) {
    let res = {...tree};
    let ch = [];
    for (let i in res.children) {
        ch.push(myBuild(nodes[res.children[i]], nodes));
    }

    res.children = ch;
    return res;
}

function update(state) {
    let f = state.nodes[0];
    f.counter++;
    state.nodes[0] = f;
}

const state = {
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
        static: {
            show: false,
            consonance: [],
            dissonance: [],
            Z: [],
            impacts: [],
        }
    },
    dmp: {
        states: [],
        strategies: [],
        n: 0,
    },
    lvm: {},

    //TODO refactor LVM
    lastId: 1,
    nodes: [{
        counter: 0,
        id: 0,
        children: [],
        func: 'AND',
        losses: .1,
        prob: .1,
    }],
    losses: .0,
};

const getters = {
    user(state) {
        return state.user;
    },

    fcmConcepts(state) {
        return state.fcm.concepts;
    },

    //TODO refactor LVM
    build: state => () => {
        let tree = myBuild(state.nodes[0], state.nodes);
        calc(tree);
        return tree;
    },
    prob: state => () => {
        let tree = myBuild(state.nodes[0], state.nodes);
        calc(tree);
        return buildPF(tree);
    },
    fal: state => () => {
        let tree = myBuild(state.nodes[0], state.nodes);
        calc(tree);
        return buildFAL(tree);
    },
};

const mutations = {
    login(state) {
        state.user.loggedIn = true;
    },

    logout(state) {
        state.user.loggedIn = false;
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

    //TODO refactor LVM
    calcLosses(state, losses) {
        update(state);
        state.losses = losses * state.nodes[0].prob;
    },
    upd(state, payload) {
        update(state);
        let old = state.nodes[payload.id];
        old.losses = payload.losses;
        old.prob = payload.prob;
    },
    ch(state, id) {
        update(state);
        let old = state.nodes[id];
        old.func = old.func == 'AND' ? 'OR' : 'AND';
    },
    add(state, payload) {
        update(state);
        payload.id = state.lastId;
        state.nodes[state.lastId] = payload;
        state.nodes[payload.parent].children.push(state.lastId);
        state.lastId++;
    },
    del(state, payload) {
        update(state);
        let old = state.nodes[payload.parent];
        old.children = old.children.filter((v, i, arr) => {
            return v != payload.removed;
        });
        state.nodes[old.id] = old;
    }
};

export default new Vuex.Store({
    state: state,
    getters: getters,
    mutations: mutations,
})