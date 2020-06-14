<template>
    <v-card class="elevation-0 pa-6">
        <v-data-table
                :headers="headers"
                :items="$store.state.fcm.matrix"
                disable-pagination
                disable-filtering
                disable-sort
                hide-default-footer
        >
            <template v-slot:body="{ items, headers }">
                <tbody>
                <tr v-for="(item,idx,k) in items" :key="idx">
                    <td v-for="(header,key) in headers" :key="key">
                        <v-chip v-if="header.value !== 'name' && item.name !== header.text"
                                :color="getColor(item, header)">
                            <v-edit-dialog
                                    :return-value.sync="item[header.value]"
                                    @save="save(item, header)"
                                    @cancel="cancel"
                                    @open="open"
                                    @close="close"
                            > {{item[header.value]}}
                                <template v-slot:input>
                                    <v-text-field
                                            v-model.number="item[header.value]"
                                            :rules="[isValid]"
                                            type="number"
                                            dense
                                            single-line
                                    ></v-text-field>
                                </template>
                            </v-edit-dialog>
                        </v-chip>
                        <v-chip v-else-if="item.name === header.text">{{item[header.value]}}</v-chip>
                        <div v-else>{{item[header.value]}}</div>
                    </td>
                </tr>
                </tbody>
            </template>
        </v-data-table>

        <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
            {{ snackText }}

            <template v-slot:action="{ attrs }">
                <v-btn v-bind="attrs" text @click="snack = false">Close</v-btn>
            </template>
        </v-snackbar>
    </v-card>
</template>

<script>
    export default {
        data() {
            return {
                snack: false,
                snackColor: '',
                snackText: '',
                isValid: input => {
                    if (input.length > 6) {
                        return "Input too long!"
                    }

                    return (-1 <= input && input <= 1) || "Not a number between -1 and 1";
                },
                headers: null,
            }
        },
        created() {
            this.initialize();
        },
        methods: {
            save(item, header) {
                if (this.isValid(item[header.value])) {
                    this.snack = true;
                    this.snackColor = 'success';
                    this.snackText = 'Сохранено'
                } else {
                    event.preventDefault();
                    this.$nextTick(() => {
                        item[header.value] = 0;
                    })
                }
            },

            cancel() {
                this.snack = true;
                this.snackColor = 'error';
                this.snackText = 'Отмена'
            },

            open() {
                this.snack = true;
                this.snackColor = 'info';
                this.snackText = 'Изменение'
            },

            close() {
                // console.log('Dialog closed')
            },

            initialize() {
                const concepts = this.$store.state.fcm.concepts;

                this.headers = [
                    {text: 'Название', align: 'start', value: 'name', width: 100},
                ];

                for (let i = 0; i < concepts.length; i++) {
                    this.headers.push({
                        text: concepts[i].name,
                        value: i.toString(),
                        align: "start",
                        width: 50,
                    })
                }
            },

            getColor(item, header) {
                if (item[header.value] > 0) {
                    return "blue"
                } else if (item[header.value] < 0) {
                    return "red"
                }
            },
        },
    }
</script>

<style scoped>

</style>