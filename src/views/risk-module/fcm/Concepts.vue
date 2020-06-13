<template>
    <v-card class="elevation-0 pa-6">
        <v-data-table
                :headers="headers"
                :items="$store.state.fcm.concepts"
                disable-sort
                disable-filtering
                disable-pagination
                hide-default-footer
        >
            <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="800px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                    color="primary"
                                    dark
                                    class="mb-2"
                                    v-bind="attrs"
                                    v-on="on"
                            >Добавить концепт
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="headline">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.name" label="Название"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-select :items="$store.state.fcm.conceptTypes" v-model="editedItem.type" label="Тип"></v-select>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-select :items="$store.state.fcm.conceptGroups" v-model="editedItem.group" label="Группа"></v-select>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-select :items="$store.state.fcm.conceptValues" v-model="editedItem.startValue" label="Начальное значение"></v-select>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-select :items="$store.state.fcm.conceptValues" v-model="editedItem.goalValue" label="Целевое значение"></v-select>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="close">Отмена</v-btn>
                                <v-btn color="blue darken-1" text @click="save">Сохранить</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-icon
                        small
                        class="mr-2"
                        @click="editItem(item)"
                >
                    mdi-pencil
                </v-icon>
                <v-icon
                        small
                        @click="deleteItem(item)"
                >
                    mdi-delete
                </v-icon>
            </template>
            <template v-slot:no-data>
                <v-card flat>
                    <v-card-text>
                        Добавьте новые концепты
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
                    text: 'Номер',
                    align: 'start',
                    value: 'id',
                },
                {text: 'Название', value: 'name'},
                {text: 'Тип', value: 'type'},
                {text: 'Группа', value: 'group'},
                {text: 'Начальное значение', value: 'startValue'},
                {text: 'Целевое значение', value: 'goalValue'},
                {text: '', value: 'actions'},
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