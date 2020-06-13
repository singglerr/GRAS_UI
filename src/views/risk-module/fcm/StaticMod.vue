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
                {text: 'Значение', value: 'val'},
            ],
            concepts: [],
            editedIndex: -1,
            editedItem: {
                id: 0,
                name: "",
                type: "",
                group: "",
                startValue: "",
                goalValue: "",
            },
            defaultItem: {
                id: 0,
                name: "",
                type: "",
                group: "",
                startValue: "",
                goalValue: "",
            },
        }),

        computed: {
            formTitle() {
                return this.editedIndex === -1 ? 'Добавление концепта' : 'Изменение концепта'
            },
        },

        watch: {
            dialog(val) {
                val || this.close()
            },
        },

        created() {
            this.initialize()
        },

        methods: {
            initialize() {

            },

            editItem(item) {
                this.editedIndex = this.$store.getters.fcmConcepts.indexOf(item);
                this.editedItem = Object.assign({}, item);
                this.dialog = true
            },

            deleteItem(item) {
                const index = this.$store.getters.fcmConcepts.indexOf(item);
                confirm('Вы действительно хотите удалить этот концепт?') && this.$store.commit({
                    type: "fcmDeleteConcept",
                    index: index,
                })
            },

            close() {
                this.dialog = false;
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem);
                    this.editedIndex = -1
                })
            },

            save() {
                if (this.validateItem()) {
                    if (this.editedIndex > -1) {
                        this.$store.commit({
                            type: "fcmEditConcept",
                            item: this.editedItem,
                            index: this.editedIndex
                        })
                    } else {
                        this.$store.commit({
                            type: "fcmAddConcept",
                            item: this.editedItem
                        })
                    }

                    this.close()
                } else {
                    alert("Заполните все поля!");
                }
            },

            validateItem() {
                return this.editedItem.name
                    && this.editedItem.type
                    && this.editedItem.group
                    && this.editedItem.startValue
                    && this.editedItem.goalValue
            }
        },
    }
</script>

<style scoped>

</style>