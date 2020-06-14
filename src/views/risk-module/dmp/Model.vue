<template>
    <v-container fluid>
        <v-row class="pl-12 pr-12 pt-6">
            <v-col
                    cols="3"
            >
                <v-text-field
                        type="number"
                        v-model="$store.state.dmp.n"
                        :rules="[integer, notEmptyField]"
                        label="Количество шагов моделирования"
                ></v-text-field>
            </v-col>
            <v-spacer></v-spacer>
            <v-btn @click="click" color="primary" :loading="loading">Рассчитать</v-btn>
        </v-row>
        <v-row v-show="showTabs" justify="center">
            <v-tabs centered class="ml-4 mr-4" center-active>
                <v-tabs-slider></v-tabs-slider>

                <v-tab>
                    Таблица результата
                </v-tab>
                <v-tab-item>
                    <v-row justify="center">
                        <v-col cols="10">
                            <v-data-table
                                    :headers="headers"
                                    :items="result"
                                    disable-sort
                                    disable-filtering
                                    dense
                            >
                            </v-data-table>
                        </v-col>
                    </v-row>
                </v-tab-item>
                <v-tab>
                    Граф
                </v-tab>
                <v-tab-item>
                    Граф
                </v-tab-item>
            </v-tabs>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "Model",
        data: () => ({
            loading: false,
            showTabs: false,
            headers: [],
            result: [],
            statesCount: 0,
            strategiesCount: 0,
        }),
        created() {
            this.statesCount = this.$store.state.dmp.states.length;
            this.strategiesCount = this.$store.state.dmp.strategies.length;
        },
        methods: {
            integer(val) {
                return !this.needInt(val) || "Введите целое число";
            },

            notEmptyField(val) {
                return val !== 0 || "Введите целое число больше 0"
            },

            click() {
                let alertText = this.getValidationAlert();
                if (alertText) {
                    return alert(alertText);
                }

                this.loading = true;
                this.process();
                this.showResult()
            },

            process() {
                this.generateHeaders();
                this.calculateQ();
                this.calculateResult();
                this.drawGraph();
            },

            generateHeaders() {
                const states = this.$store.state.dmp.states;
                this.headers = [];
                this.headers.push({
                    text: "Номер\n шага",
                    value: "step",
                    align: "start",
                    width: 110
                });

                states.forEach(state => {
                    this.headers.push({
                        text: `V[${state.name}]`,
                        value: `V${state.id}`,
                        width: 50,
                        align: "center"
                    })
                });

                states.forEach(state => {
                    this.headers.push({
                        text: `D[${state.name}]`,
                        value: `D${state.id}`,
                        align: "center"
                    })
                });
            },

            calculateQ() {
                const strategies = this.$store.state.dmp.strategies;
                strategies.forEach(strategy => {
                    const q = [];
                    for (let i = 0; i < strategy.prob.length; i++) {
                        let sum = 0;
                        for (let j = 0; j < strategy.prob.length; j++) {
                            sum += strategy.prob[i][j.toString()] * strategy.profit[i][j.toString()];
                        }

                        q.push(sum);
                    }

                    strategy.q = q;
                })
            },

            calculateResult() {
                const states = this.$store.state.dmp.states;
                const strategies = this.$store.state.dmp.strategies;
                const stepsCount = this.$store.state.dmp.n;

                this.result.push(this.buildZeroResultObject());

                for (let step = 1; step <= stepsCount; step++) {
                    const resultObject = {step: step};
                    for (let fromState = 0; fromState < states.length; fromState++) {
                        let maxVal = Number.NEGATIVE_INFINITY;
                        let maxStrategy = 0;
                        for (let strategy = 0; strategy < strategies.length; strategy++) {
                            let value = strategies[strategy].q[fromState];
                            for (let destState = 0; destState < states.length; destState++) {
                                console.log(strategies[strategy].prob[fromState][destState.toString()]);
                                console.log(this.result[step - 1], `V${destState}`);
                                console.log("--------------------------------");

                                value += strategies[strategy].prob[fromState][destState.toString()] * this.result[step - 1][`V${destState + 1}`];
                            }

                            // console.log(value);
                            if (value > maxVal) {
                                maxVal = value;
                                maxStrategy = strategy;
                            }
                        }

                        resultObject[`V${fromState + 1}`] = this.toFixed(maxVal, 5);
                        resultObject[`D${fromState + 1}`] = strategies[maxStrategy].name;
                    }

                    this.result.push(resultObject);
                }

                this.result.splice(0, 1);
            },

            toFixed(val, count) {
                const strVal = val.toString();
                const indexDot = strVal.indexOf(".");
                if (indexDot === -1) {
                    return val;
                }

                return Number.parseFloat(strVal.substring(0, indexDot + count + 1));
            },

            buildZeroResultObject() {
                const obj = {step: 0};
                for (let header = 1; header < this.headers.length; header++) {
                    obj[this.headers[header].value] = 0;
                }

                return obj;
            },

            showResult() {
                this.showTabs = true;
                this.loading = false;
            },

            drawGraph() {
                //TODO draw graph dmp

            },

            getValidationAlert() {
                if (this.needStates()) {
                    return "Сначала добавьте состояния!";
                }

                if (this.needStrategies()) {
                    return "Сначала добавьте стратегии!"
                }

                if (this.needInt(this.$store.state.dmp.n)) {
                    return "Число шагов моделирования должно быть целым!"
                }

                if (this.needGreaterZero()) {
                    return "Число шагов моделирования должно быть целым больше 0!"
                }

                return false;
            },

            needInt(val) {
                return val.toString().includes(".");
            },

            needGreaterZero() {
                return this.$store.state.dmp.n == 0;
            },

            needStates() {
                return this.statesCount === 0;
            },

            needStrategies() {
                return this.strategiesCount === 0;
            }
        }
    }
</script>