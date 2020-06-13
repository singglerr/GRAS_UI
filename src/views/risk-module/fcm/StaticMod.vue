<template>
    <v-card class="elevation-0 pa-6">
        <v-data-table
                :headers="headers"
                :items="$store.state.fcm.staticData"
                disable-sort
                disable-filtering
                disable-pagination
                hide-default-footer
        >
            <template v-slot:no-data>
                <v-card flat>
                    <v-card-text>
                        Добавьте новые концепты на вкладке "Концепты" и заполните матрицу влияний
                    </v-card-text>
                </v-card>
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
    export default {
        data: () => ({
            dialog: false,
            headers: [
                {
                    text: 'Название показателя',
                    align: 'start',
                    value: 'name',
                },
                {text: 'Значение', value: 'val', align: "center"},
            ],
        }),

        created() {
            this.initialize()
        },

        methods: {
            initialize() {

            },


        }
    }
</script>

<style scoped>

</style>