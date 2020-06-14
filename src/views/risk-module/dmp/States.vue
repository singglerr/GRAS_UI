<template>
    <v-card class="elevation-0 pa-6">
        <v-data-table
                :headers="headers"
                :items="$store.state.dmp.states"
                disable-sort
                disable-filtering
                disable-pagination
                hide-default-footer
        >
            <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="400px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                    color="primary"
                                    dark
                                    class="mb-2"
                                    v-bind="attrs"
                                    v-on="on"
                            >Добавить состояние
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="headline">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-text-field v-model="editedItem.name" label="Название"></v-text-field>
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
                        Добавьте состояния
                    </v-card-text>
                </v-card>
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
    export default {
        name: "States",
        data: () => ({
            dialog: false,
            headers: [
                {
                    text: 'Номер',
                    align: 'center',
                    value: 'id',
                    width: 80
                },
                {text: 'Название', value: 'name', align: "start"},
                {text: '', value: 'actions', align: "center", width: 80},

            ],
            editing: false,
            editedItem: {
                id: 0,
                name: "",
            },
            defaultItem: {
                id: 0,
                name: "",
            },
        }),

        computed: {
            formTitle() {
                return this.editing ? 'Изменение состояния' : 'Добавление состояния';
            },
        },

        watch: {
            dialog(val) {
                val || this.close()
            },
        },


        methods: {
            editItem(item) {
                this.editedItem = Object.assign({}, item);
                this.dialog = true;
                this.editing = true;
            },

            deleteItem(item) {
                confirm('Вы действительно хотите удалить это состояние?') && this.$store.commit({
                    type: "dmpDeleteState",
                    item: item,
                })
            },

            close() {
                this.dialog = false;
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem);
                    this.editing = false;
                })
            },

            save() {
                if (this.validateItem()) {
                    if (this.editing) {
                        this.$store.commit({
                            type: "dmpEditState",
                            item: this.editedItem,
                        });
                    } else {
                        this.$store.commit({
                            type: "dmpAddState",
                            item: this.editedItem
                        })
                    }

                    this.close()
                } else {
                    alert("Заполните название!");
                }
            },

            validateItem() {
                return !!this.editedItem.name
            }
        },
    }
</script>

<style scoped>

</style>