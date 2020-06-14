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
        <v-row :hidden="hidden" justify="center">
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
                                    :items="dataEx"
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
            hidden: true,
            headers: [
                {text: "Номер\n шага", value: "index", align: "start", width: 110},
            ],
            dataEx: [
                {index: 1},
            ],
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
                this.generateHeader();
                //TODO вычисление дмп


            },

            generateHeader() {
                const states = this.$store.state.dmp.states;
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

            showResult() {
                this.hidden = false;
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