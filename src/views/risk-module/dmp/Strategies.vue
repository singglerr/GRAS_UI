<template>
    <v-card class="elevation-0 pa-6">
        <v-data-table
                :headers="headers"
                :items="$store.state.dmp.strategies"
                disable-sort
                disable-filtering
                disable-pagination
                hide-default-footer
        >
            <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="1200px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                    color="primary"
                                    dark
                                    class="mb-2"
                                    v-bind="attrs"
                                    v-on="on"
                            >Добавить стратегию
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="headline">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-row no-gutters>
                                        <v-col cols="4">
                                            <v-text-field v-model="editedItem.name" label="Название"></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <v-data-table
                                                    :headers="stratHeaders"
                                                    :items="editedItem.prob"
                                                    disable-sort
                                                    disable-filtering
                                                    disable-pagination
                                                    hide-default-footer
                                                    dense
                                            >
                                                <template v-slot:top>
                                                    <v-card-title class="justify-center">Вероятности переходов</v-card-title>
                                                </template>

                                                <template v-slot:body="{ items, headers }">
                                                    <tbody>
                                                    <tr v-for="(item,idx,k) in items" :key="idx">
                                                        <td v-for="(header,key) in headers" :key="key">
                                                            <v-chip v-if="header.value !== 'name'">
                                                                <v-edit-dialog :return-value.sync="item[header.value]"> {{item[header.value]}}
                                                                    <template v-slot:input>
                                                                        <v-text-field
                                                                                v-model="item[header.value]"
                                                                                :rules="[mustBeFrom0To1]"
                                                                                type="number"
                                                                                dense
                                                                                single-line
                                                                        ></v-text-field>
                                                                    </template>
                                                                </v-edit-dialog>
                                                            </v-chip>
                                                            <div v-else>{{item[header.value]}}</div>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </template>

                                                <template v-slot:no-data>
                                                    <v-row justify="center">
                                                        Сначала добавьте состояния
                                                    </v-row>
                                                </template>
                                            </v-data-table>
                                        </v-col>
                                        <v-col>
                                            <v-data-table
                                                    :headers="stratHeaders"
                                                    :items="editedItem.profit"
                                                    disable-sort
                                                    disable-filtering
                                                    disable-pagination
                                                    hide-default-footer
                                                    dense
                                            >
                                                <template v-slot:top>
                                                    <v-card-title class="justify-center">Доходности переходов</v-card-title>
                                                </template>

                                                <template v-slot:body="{ items, headers }">
                                                    <tbody>
                                                    <tr v-for="(item,idx,k) in items" :key="idx">
                                                        <td v-for="(header,key) in headers" :key="key">
                                                            <v-chip v-if="header.value !== 'name'">
                                                                <v-edit-dialog :return-value.sync="item[header.value]"> {{item[header.value]}}
                                                                    <template v-slot:input>
                                                                        <v-text-field
                                                                                v-model="item[header.value]"
                                                                                type="number"
                                                                                dense
                                                                                single-line
                                                                        ></v-text-field>
                                                                    </template>
                                                                </v-edit-dialog>
                                                            </v-chip>
                                                            <div v-else>{{item[header.value]}}</div>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </template>

                                                <template v-slot:no-data>
                                                    <v-row justify="center">
                                                        Сначала добавьте состояния
                                                    </v-row>
                                                </template>
                                            </v-data-table>
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
        name: "Strategies",
        data: () => ({
            dialog: false,
            expanded: [],
            headers: [
                {
                    text: 'Номер',
                    align: 'center',
                    value: 'id',
                    width: 80
                },
                {text: 'Название', value: 'name'},
                {text: '', value: 'actions', align: "center", width: 80},
                {text: '', value: 'data-table-expand', width: 50},
            ],
            editing: false,
            editedItem: {
                id: 0,
                name: "",
                prob: [],
                profit: [],
            },
            defaultItem: {
                id: 0,
                name: "",
                prob: [],
                profit: [],
            },
            stratHeaders: [
                {text: "Название состояния", value: "name", align: "start", width: 100},
            ]
        }),

        computed: {
            formTitle() {
                return this.editing ? 'Изменение стратегии' : 'Добавление стратегии';
            },
        },

        watch: {
            dialog(val) {
                val || this.close()
            },
        },

        created() {
            this.$store.state.dmp.states.forEach((state, idx) => {
                this.stratHeaders.push({
                    text: state.name,
                    value: idx.toString(),
                    align: "start",
                    width: "50px",
                });

                const newRow = {name: state.name};
                for (let i = 0; i < this.$store.state.dmp.states.length; i++) {
                    newRow[i.toString()] = 0;
                }

                this.defaultItem.prob.push(newRow);
                this.defaultItem.profit.push({...newRow});
            });

            this.editedItem = Object.assign({}, this.defaultItem);
        },

        methods: {
            editItem(item) {
                this.editedItem = Object.assign({}, item);
                this.editing = true;
                this.dialog = true;
            },

            deleteItem(item) {
                confirm('Вы действительно хотите удалить эту стратегию?') && this.$store.commit({
                    type: "dmpDeleteStrategy",
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
                let alertText = this.getValidationAlert();
                if (alertText) {
                    return alert(alertText);
                }

                if (this.editing) {
                    this.$store.commit({
                        type: "dmpEditStrategy",
                        item: this.editedItem,
                    })
                } else {
                    this.$store.commit({
                        type: "dmpAddStrategy",
                        item: this.editedItem
                    })
                }

                this.close()
            },

            getValidationAlert() {
                if (this.fillSates()) {
                    return "Сначала заполните состояния!"
                }

                if (this.sumNot1()) {
                    return "Сумма вероятностей по строкам должна равняться 1!"
                }

                if (this.fillName()) {
                    return "Заполните название стратегии!";
                }

                return false;
            },

            sumNot1() {
                for (let row of this.editedItem.prob) {
                    let sum = 0;
                    for (let i = 0; i < this.editedItem.prob.length; i++) {
                        sum += +row[i.toString()]
                    }

                    if (sum !== 1) {
                        return true;
                    }
                }

                return false;
            },

            fillName() {
                return this.editedItem.name === "";
            },

            fillSates() {
                return this.stratHeaders.length === 1;
            },

            mustBeFrom0To1(val) {
                return 0 <= val && val <= 1 || "Допускается только значение от 0 до 1";
            }
        },
    }
</script>