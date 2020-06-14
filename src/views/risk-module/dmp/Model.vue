<template>
    <v-container fluid>
        <v-row class="pl-12 pr-12 pt-6">
            <v-col>
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
        <v-row :hidden="hidden">
            asdonasdnasdasdnl
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "Model",
        data: () => ({
            loading: false,
            hidden: true,
        }),
        methods: {
            integer(val) {
                return !val.toString().includes(".") || "Введите целое число больше 0";
            },

            notEmptyField(val) {
                return val !== 0 || "Введите целое число больше 0"
            },

            click() {
                if (this.$store.state.dmp.n.toString().includes(".") || this.$store.state.dmp.n === 0) {
                    return alert("Число шагов моделирования должно быть целым больше 0!");
                }

                this.loading = true;
                this.compute();
                this.showResult()
            },

            compute() {

            },

            showResult() {
                this.hidden = false;
            }
        }
    }
</script>