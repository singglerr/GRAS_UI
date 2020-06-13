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
                        <v-chip v-if="header.value !== 'name'" :color="getColor(item, header)">
                            <v-edit-dialog

                                    :return-value.sync="item[header.value]"
                                    @save="save(item, header)"
                                    @cancel="cancel"
                                    @open="open"
                                    @close="close"
                            > {{item[header.value]}}
                                <template v-slot:input>
                                    <v-text-field
                                            v-model="item[header.value]"
                                            :rules="[isValid]"
                                            label="Edit"
                                            single-line
                                            counter
                                    ></v-text-field>
                                </template>
                            </v-edit-dialog>
                        </v-chip>
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
                    const matches = input.toString().match(`^[-+]?[0-9]*\.?[0-9]+$`) !== null;
                    if (!matches) {
                        return "Not a number between -1 and 1";
                    }

                    if (input.length > 6) {
                        return "Input too long!"
                    }

                    const num = Number.parseFloat(input);
                    return (-1 <= num && num <= 1) || "Not a number between -1 and 1";
                },
                headers: [
                    {text: 'Название', align: 'start', value: 'name'},
                ],
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
                    this.snackText = 'Data saved'
                } else {
                    console.log(item[header.value]);
                    event.preventDefault();
                }
            },

            cancel() {
                this.snack = true;
                this.snackColor = 'error';
                this.snackText = 'Canceled'
            },

            open() {
                this.snack = true;
                this.snackColor = 'info';
                this.snackText = 'Dialog opened'
            },

            close() {
                console.log('Dialog closed')
            },

            initialize() {
                const concepts = this.$store.state.fcm.concepts;

                for (let i = 0; i < concepts.length; i++) {
                    this.headers.push({
                        text: concepts[i].name,
                        value: i.toString(),
                    })
                }

                this.$store.commit("fcmMatrixReset");
                for (let i = 0; i < concepts.length; i++) {
                    const row = {};
                    row.name = concepts[i].name;
                    for (let j = 1; j < this.headers.length; j++) {
                        row[this.headers[j].value] = 0;
                    }
                    this.$store.state.fcm.matrix.push(row);
                }
            },

            getColor(item, header) {
                if (item[header.value] > 0) {
                    return "blue"
                } else if (item[header.value] < 0) {
                    return "red"
                }
            }
        },
    }
</script>

<style scoped>

</style>