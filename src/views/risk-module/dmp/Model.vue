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
            <v-btn @click="compute" color="primary" :loading="loading">Рассчитать</v-btn>
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
                return !val.toString().includes(".") || "Введите целое число";
            },

            notEmptyField(val) {
                return val != 0 || "Введите целое число"
            },

            compute() {
                this.loading = true;
                if (this.$store.state.dmp.n.toString().includes(".") || !this.$store.state.dmp.n) {
                    alert("Число шагов моделирования должно быть целым!");
                }

                setTimeout(() => {
                    this.showResult();
                    this.loading = false;
                }, 2000);
            },

            showResult() {
                this.hidden = false;
            }


        }
    }
</script>

<style scoped>

</style>