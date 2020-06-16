<template>
    <v-card class="elevation-0 pa-6">
        <v-row justify="end">
            <v-btn class="mr-6" @click="process" color="primary" :loading="loading">Рассчитать</v-btn>
        </v-row>
        <v-container v-show="$store.state.fcm.static.show">
            <v-row>
                <v-col>
                    <v-data-table
                            :headers="headersConc"
                            :items="$store.state.fcm.static.consonance"
                            disable-sort
                            disable-filtering
                            disable-pagination
                            hide-default-footer
                    >
                        <template v-slot:top>
                            <v-row justify="center">
                                <v-card-title>Матрица консонансов</v-card-title>
                            </v-row>
                        </template>

                        <template v-slot:no-data>
                            <v-card flat>
                                <v-card-text>
                                    Добавьте новые концепты на вкладке "Концепты" и заполните матрицу влияний
                                </v-card-text>
                            </v-card>
                        </template>
                    </v-data-table>

                    <v-data-table
                            :headers="headersDiss"
                            :items="$store.state.fcm.static.dissonance"
                            disable-sort
                            disable-filtering
                            disable-pagination
                            hide-default-footer
                    >
                        <template v-slot:top>
                            <v-row justify="center">
                                <v-card-title>Матрица диссонансов</v-card-title>
                            </v-row>
                        </template>

                        <template v-slot:no-data>
                            <v-card flat>
                                <v-card-text>
                                    Добавьте новые концепты на вкладке "Концепты" и заполните матрицу влияний
                                </v-card-text>
                            </v-card>
                        </template>
                    </v-data-table>

                    <v-data-table
                            :headers="headersImpact"
                            :items="$store.state.fcm.static.impacts"
                            disable-sort
                            disable-filtering
                            disable-pagination
                            hide-default-footer
                    >
                        <template v-slot:top>
                            <v-row justify="center">
                                <v-card-title>Матрица взаимного влияния концептов</v-card-title>
                            </v-row>
                        </template>

                        <template v-slot:no-data>
                            <v-card flat>
                                <v-card-text>
                                    Добавьте новые концепты на вкладке "Концепты" и заполните матрицу влияний
                                </v-card-text>
                            </v-card>
                        </template>
                    </v-data-table>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
    import utils from "../../../utils";
    const simpleBarrier = require("simple-barrier");

    export default {
        data: () => ({
            dialog: false,
            loading: false,
            headersConc: [],
            headersDiss: [],
            headersImpact: [],
            accuracy: 4,
        }),

        created() {
            this.generateHeaders();
        },

        methods: {
            generateHeaders() {
                const common = this.generateCommonHeaders();
                this.headersConc = [...common];
                this.headersDiss = [...common];
                this.headersImpact = [...common];

                this.headersConc.push({
                    text: "Коссонанс влияния концепта на систему",
                    value: "conc",
                    align: "center"
                });

                this.headersDiss.push({
                    text: "Диссонанс влияния концепта на систему",
                    value: "diss",
                    align: "center"
                });

                this.headersImpact.push({
                    text: "Совокупное воздействие концепта на систему",
                    value: "impact",
                    align: "center"
                })
            },

            generateCommonHeaders() {
                const common = [{text: 'Концепт', align: 'start', value: 'name'}];

                this.$store.state.fcm.concepts.forEach((concept, index) => {
                    common.push({
                        text: concept.name,
                        value: `${index}`,
                        align: "center",
                    })
                });

                return common;
            },

            process() {
                this.loading = true;
                this.calculate(() => {
                    this.loading = false;
                    this.$store.state.fcm.static.show = true;
                })
            },

            async calculate(cb) {
                this.calculateZ();

                const barrier = simpleBarrier();

                console.log(new Date());
                this.calculateConsonanceDissonance(barrier.waitOn());
                this.calculateImpacts(barrier.waitOn());

                barrier.endWith(function (res) {
                    cb();
                });
            },

            calculateZ() {
                const Z = this.getMatrixFromStore();
                const w = utils.copyMatrix(Z);
                const len = Z.length;

                for (let i = 0; i < len; i++) {
                    for (let from = 0; from < len; from++) {
                        for (let to = 0; to < len; to++) {
                            Z[from][to] = Math.max(Z[from][to], Z[from][i] * Z[i][to]);
                        }
                    }
                }

                const _Z = utils.getEmptyMatrix(len);
                for (let i = 0; i < len; i++) {
                    for (let j = 0; j < len; j++) {
                        const resList = [];
                        this.getZVal(i, j, utils.copyMatrix(w), 0, 0, resList);
                        _Z[i][j] = resList.length === 0 ? 0 : utils.toFixed(Math.min(...resList), 10);
                    }
                }

                this.$store.state.fcm.static.Z = [];
                for (let i = 0; i < len; i++) {
                    const row = [];
                    for (let j = 0; j < len; j++) {
                        row.push({
                            pos: Z[i][j],
                            neg: _Z[i][j],
                        })
                    }

                    this.$store.state.fcm.static.Z.push(row)
                }
            },

            getZVal(current, end, w, value, level, resList) {
                if (current === end) {
                    if (value < 0) {
                        resList.push(value);
                        return
                    } else {
                        return
                    }
                }

                for (let j = 0; j < w.length; j++) {
                    if (w[current][j] !== 0) {
                        if (level === 0) {
                            value = w[current][j];
                        } else {
                            value *= w[current][j];
                        }

                        w[current][j] = 0;
                        this.getZVal(j, end, utils.copyMatrix(w), value, level + 1, resList);
                    }
                }
            },

            getMatrixFromStore() {
                const length = this.$store.state.fcm.matrix.length;
                const matr = [];
                this.$store.state.fcm.matrix.forEach(row => {
                    const rowNew = [];
                    for (let i = 0; i < length; i++) {
                        rowNew.push(row[`${i}`])
                    }

                    matr.push(rowNew);
                });

                return matr;
            },

            async calculateConsonanceDissonance(end) {
                const Z = this.$store.state.fcm.static.Z;
                const concepts = this.$store.state.fcm.concepts;

                const sumConsByCol = [];
                for (let i = 0; i < Z.length; i++) {
                    sumConsByCol.push(0);
                }

                const consonance = [];
                const dissonance = [];

                for (let i = 0; i < Z.length; i++) {
                    const rowCons = {name: concepts[i].name};
                    const rowDiss = {name: concepts[i].name};
                    let sumConsByRow = 0;
                    for (let j = 0; j < Z.length; j++) {
                        let val = 0;
                        if (Z[i][j].pos !== 0 && Z[i][j].neg !== 0) {
                            val = Math.abs(Z[i][j].pos + Z[i][j].neg) / (Math.abs(Z[i][j].pos) + Math.abs(Z[i][j].neg));
                        }

                        rowCons[`${j}`] = utils.toFixed(val, this.accuracy);
                        rowDiss[`${j}`] = utils.toFixed(1 - val, this.accuracy);

                        sumConsByRow += val;
                        sumConsByCol[j] += val;
                    }

                    rowCons.conc = utils.toFixed(sumConsByRow / Z.length, this.accuracy);
                    rowDiss.diss = utils.toFixed(1 - sumConsByRow / Z.length, this.accuracy);

                    consonance.push(rowCons);
                    dissonance.push(rowDiss);
                }

                const systemOnConceptCons = {name: "Консонанс влияния системы на концепт"};
                const systemOnConceptDiss = {name: "Диссонанс влияния системы на концепт"};
                for (let i = 0; i < Z.length; i++) {
                    const val = sumConsByCol[i] / Z.length;

                    systemOnConceptCons[`${i}`] = utils.toFixed(val, this.accuracy);
                    systemOnConceptDiss[`${i}`] = utils.toFixed(1 - val, this.accuracy);
                }

                consonance.push(systemOnConceptCons);
                dissonance.push(systemOnConceptDiss);

                this.$store.state.fcm.static.consonance = consonance;
                this.$store.state.fcm.static.dissonance = dissonance;

                setTimeout(() => {
                    end();
                }, 0);
            },

            async calculateImpacts(end) {
                const Z = this.$store.state.fcm.static.Z;
                const concepts = this.$store.state.fcm.concepts;

                const sumImpactByCol = [];
                for (let i = 0; i < Z.length; i++) {
                    sumImpactByCol.push(0);
                }

                const impacts = [];

                for (let i = 0; i < Z.length; i++) {
                    const rowImpacts = {name: concepts[i].name};
                    let sumImpactByRow = 0;
                    for (let j = 0; j < Z.length; j++) {
                        let val = Z[i][j].pos;
                        if (Z[i][j].pos < -Z[i][j].neg) {
                            val = Z[i][j].neg
                        }

                        rowImpacts[`${j}`] = utils.toFixed(val, this.accuracy);

                        sumImpactByRow += val;
                        sumImpactByCol[j] += val;
                    }

                    rowImpacts.impact = utils.toFixed(sumImpactByRow / Z.length, this.accuracy);
                    impacts.push(rowImpacts);
                }

                const systemOnConceptCons = {name: "Совокупное воздействие системы на концепт"};
                for (let i = 0; i < Z.length; i++) {
                    const val = sumImpactByCol[i] / Z.length;

                    systemOnConceptCons[`${i}`] = utils.toFixed(val, this.accuracy);
                }

                impacts.push(systemOnConceptCons);

                this.$store.state.fcm.static.impacts = impacts;
                end();
            },
        }
    }
</script>

<style scoped>

</style>