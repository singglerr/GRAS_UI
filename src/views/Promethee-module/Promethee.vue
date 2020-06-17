<template>
    <div>
        <br/>
        Метод Promethee <br/><br/>

        <v-dialog v-model="isAltDialogVisible" max-width="800px">
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                        color="primary"
                        dark
                        class="mb-2"
                        v-bind="attrs"
                        v-on="on"
                >Добавить альтернативу
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="headline">Ввод альтернатив</span>
                </v-card-title>

                <v-card-text>
                    <!--TODO форма ввода альтернативы -->
                    <label for="alt-name">
                        Название альтернативы
                    </label>
                    <input type="text" id="alt-name" v-model="newAltName"/>

                    <div>
                        <span>Альтернативы:</span>
                        <div v-for="(alt, index) in alternatives">
                            <span>{{alt}}</span>
                            <span @click="removeAlt(index)"> x </span>
                        </div>
                    </div>

                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="onCloseAltDialog">Закрыть</v-btn>
                    <v-btn color="blue darken-1" text @click="onSaveAltDialog">Добавить</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="isCritDialogVisible" max-width="800px">
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                        color="primary"
                        dark
                        class="mb-2"
                        v-bind="attrs"
                        v-on="on"
                >Добавить критерий
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="headline">Ввод критериев</span>
                </v-card-title>

                <v-card-text>
                    <label for="name"> Название критерия: </label>
                    <input type="text" name="name" v-model="newCrit.name"
                           id="name"/><br/><br/>
                    <label for="weight"> Вес критерия: </label>
                    <input type="number" name="weight" v-model.number="newCrit.weight"
                           id="weight"/><br/><br/>
                    <input type="radio" name="state" id="plus"
                           value="+" v-model="newCrit.sign"/>
                    <label for="plus"> Положительно направленный</label> <br/><br/>
                    <input type="radio" name="state" id="minus"
                           value="-" v-model="newCrit.sign"/>
                    <label for="minus"> Отрицательно направленный</label> <br/><br/>
                    <v-select :items="critFunctionTypes" v-model="newCrit.type"></v-select>
                    <template v-if="newCrit.type===critFunctionTypes[0]">
                        <span></span>
                    </template>
                    <template v-else-if="newCrit.type===critFunctionTypes[1]">
                        <label for="P1-param">Параметр q </label><br/>
                        <input id="P1-param" type="number" v-model.number="newCrit.q"/>
                    </template>
                    <template v-else-if="newCrit.type===critFunctionTypes[2]">
                        <label for="P2-param">Параметр s </label><br/>
                        <input id="P2-param" type="number" v-model.number="newCrit.s"/>
                    </template>
                    <template v-else-if="newCrit.type===critFunctionTypes[3]">
                        <label for="P3-param">Параметр q </label><br/>
                        <input id="P3-param" type="number" v-model.number="newCrit.q"/><br/>
                        <label for="P4-param">Параметр s </label><br/>
                        <input id="P4-param" type="number" v-model.number="newCrit.s"/>
                    </template>
                    <template v-else-if="newCrit.type===critFunctionTypes[4]">
                        <label for="P5-param">Параметр q </label><br/>
                        <input id="P5-param" type="number" v-model.number="newCrit.q"/><br/>
                        <label for="P6-param">Параметр s </label><br/>
                        <input id="P6-param" type="number" v-model.number="newCrit.s"/>
                    </template>
                    <template v-else-if="newCrit.type===critFunctionTypes[5]">
                        <label for="P7-param">Параметр σ </label><br/>
                        <input id="P7-param" type="number" v-model.number="newCrit.si"/>
                    </template>

                    <div>
                        <span>Критерии:</span>
                        <div v-for="(crit, index) in criterions">
                            <span>{{crit.name}}</span>
                            <span @click="removeCrit(index)"> x </span>
                        </div>
                    </div>

                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="onCloseCritDialog">Закрыть</v-btn>
                    <v-btn color="blue darken-1" text @click="onSaveCritDialog">Добавить</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-card-actions>
            <v-btn color="primary" @click="calculate">Рассчитать</v-btn>
        </v-card-actions>

        <table>
            <tr>
                <th></th>
                <th v-for="(crit, j) in criterions">
                    {{crit.name}}
                </th>
            </tr>
            <tbody>
            <tr v-for="(alt, i) in alternatives">
                <th>{{alt}}</th>
                <td v-for="(crit, j) in criterions">
                    <!--                    123-->
                    <!--                    matrix={{matrix}}-->
                    <!--                    i={{i}} j={{j}}-->
                    <input type="number" v-model="matrix[i][j]">
                </td>
            </tr>
            </tbody>

        </table>

        <template v-if="calculated">
            Разницы
            <table v-for="(crit, critInd) in criterions">
                <caption>{{crit.name}}</caption>
                <tr>
                    <th></th>
                    <th v-for="(alt) in alternatives">
                        {{alt}}
                    </th>
                </tr>
                <tbody>
                <tr v-for="(alt, i) in alternatives">
                    <th>{{alt}}</th>
                    <td v-for="(alt, j) in alternatives">
                        <!--                    <input type="number" v-model="matrix[i][j]">-->
                        {{differences[critInd][i][j]}}
                    </td>
                </tr>
                </tbody>

            </table>

            с функцией критерия
            <table v-for="(crit, critInd) in criterions">
                <caption>{{crit.name}}</caption>
                <tr>
                    <th></th>
                    <th v-for="(alt) in alternatives">
                        {{alt}}
                    </th>
                </tr>
                <tbody>
                <tr v-for="(alt, i) in alternatives">
                    <th>{{alt}}</th>
                    <td v-for="(alt, j) in alternatives">
                        <!--                    <input type="number" v-model="matrix[i][j]">-->
                        {{differences2[critInd][i][j]}}
                    </td>
                </tr>
                </tbody>

            </table>

            pi
            <table>
                <tr>
                    <th></th>
                    <th v-for="(alt) in alternatives">
                        {{alt}}
                    </th>
                </tr>
                <tbody>
                <tr v-for="(alt, i) in alternatives">
                    <th>{{alt}}</th>
                    <td v-for="(alt, j) in alternatives">
                        <!--                    <input type="number" v-model="matrix[i][j]">-->
                        {{pi_matrix[i][j]}}
                    </td>
                </tr>
                </tbody>
            </table>

            f+
            <div>{{f_plus}}</div>

            f-
            <div>{{f_minus}}</div>

            f
            <div>{{f_arr}}</div>

            <div>
                result
                <div>{{sortedAlts}}</div>
            </div>


        </template>

    </div>
</template>

<script>
    export default {
        name: "TheoryIndex",
        data: () => ({
            // count_alt: 1,
            // count_crit: 1,
            isAltDialogVisible: false,
            isCritDialogVisible: false,

            newAltName: '',

            alternatives: [],
            criterions: [],

            critFunctionTypes: [
                'Обычная функция',
                'U-образная функция',
                'V-образная функция',
                'Уровневая функция',
                'V-образная функция с порогами безразличия',
                'Функция Гаусса'
            ],
            newCrit: {type: '', sign: "+", name: ''},
            matrix: [],

            calculated: false,
            //for debug
            differences: [],
            differences2: [],
            pi_matrix: [],
            f_plus: [],
            f_minus: [],
            f_arr: [],
            sortedAlts: [],
        }),
        methods: {
            onCloseAltDialog() {
                this.isAltDialogVisible = false;
                this.newAltName = '';
            },
            onSaveAltDialog() {
                //  this.isAltDialogVisible = false;
                this.matrix.push([]);
                this.alternatives.push(this.newAltName);
                this.newAltName = '';
            },

            onCloseCritDialog() {
                this.isCritDialogVisible = false;
                this.newCrit = {
                    type: '',
                    sign: "+",
                    name: '',
                    weight: 0.5,
                };
            },
            onSaveCritDialog() {
                //this.isCritDialogVisible = false;

                this.criterions.push({...this.newCrit});

                this.newCrit = {
                    type: '',
                    sign: "+",
                    name: '',
                    weight: 0.5,
                };

            },

            calculate() {
                //let differences = [];
                this.differences = [];
                this.differences2 = [];
                this.pi_matrix = [];

                for (let critNumber = 0; critNumber < this.criterions.length; critNumber++) {
                    let critDiffMatrix = [];
                    let critDiffMatrix2 = [];
                    for (let altNum1 = 0; altNum1 < this.alternatives.length; altNum1++) {
                        critDiffMatrix.push([]);
                        critDiffMatrix2.push([]);
                        for (let altNum2 = 0; altNum2 < this.alternatives.length; altNum2++) {
                            critDiffMatrix[altNum1][altNum2]
                                = this.matrix[altNum1][critNumber] - this.matrix[altNum2][critNumber];
                            critDiffMatrix2[altNum1][altNum2]
                                = this.mainFunc(critDiffMatrix[altNum1][altNum2], this.criterions[critNumber]);
                        }
                    }
                    this.differences.push(critDiffMatrix);
                    this.differences2.push(critDiffMatrix2);
                }

                for (let altNum1 = 0; altNum1 < this.alternatives.length; altNum1++) {
                    this.pi_matrix.push([]);
                    for (let altNum2 = 0; altNum2 < this.alternatives.length; altNum2++) {
                        this.pi_matrix[altNum1][altNum2] = 0;
                        for (let critNum = 0; critNum < this.criterions.length; critNum++) {
                            this.pi_matrix[altNum1][altNum2] +=
                                this.criterions[critNum].weight
                                * this.differences2[critNum][altNum1][altNum2]
                        }
                    }
                }

                this.f_plus = [];
                this.f_minus = [];

                for (let i = 0; i < this.alternatives.length; i++) {
                    this.f_plus[i] = 0;
                    for (let j = 0; j < this.alternatives.length; j++) {
                        this.f_plus[i] += this.pi_matrix[i][j];
                    }
                }

                for (let i = 0; i < this.alternatives.length; i++) {
                    this.f_minus[i] = 0;
                    for (let j = 0; j < this.alternatives.length; j++) {
                        this.f_minus[i] += this.pi_matrix[j][i];
                    }
                }
                this.f_arr = [];

                for (let i = 0; i < this.alternatives.length; i++) {
                    this.f_arr[i] = this.f_plus[i] - this.f_minus[i];
                }
                const tmpSortKeys = [...this.f_arr];
                const tmpSortedAlts = [...this.alternatives];

                for (let i = 0; i < tmpSortedAlts.length; i++) {
                    for (let j = i+1; j < tmpSortedAlts.length; j++) {
                        if (tmpSortKeys[i] < tmpSortKeys[j]) {
                            let tmp = tmpSortKeys[i];
                            tmpSortKeys[i] = tmpSortKeys[j];
                            tmpSortKeys[j] = tmp;

                            tmp = tmpSortedAlts[i];
                            tmpSortedAlts[i] = tmpSortedAlts[j];
                            tmpSortedAlts[j] = tmp;
                            console.log('swap', tmpSortKeys, tmpSortedAlts);
                        }

                    }
                }
                this.sortedAlts = tmpSortedAlts;

                this.calculated = true;

            },
            calcFunction1(sign, d) {
                if (sign === "+")
                    return (d > 0 ? 1 : 0);
                else
                    return (d <= 0 ? 1 : 0);
            },
            calcFunction2(sign, d, q) {
                if (sign === "+")
                    return (d > q ? 1 : 0);
                else
                    return (d <= q ? 1 : 0);
            },
            calcFunction3(sign, d, s) {
                if (sign === "+")
                    if (d > s)
                        return (1);
                    else if (0 < d && d <= s)
                        return (d / s);
                    else
                        return (0);
                else if (sign === "-")
                    //return 1-this.calcFunction3('+', d, s);
                    if (d > s)
                        return (0);
                    else if (0 < d && d <= s)
                        return (d / s);
                    else
                        return (1);
            },
            calcFunction4(sign, d, q, s) {
                if (sign === "+")
                    if (d > s)
                        return (1);
                    else if (q < d && d <= s)
                        return (0.5);
                    else
                        return (0);
                else if (sign === "-")
                    if (d > s)
                        return (0);
                    else if (q < d && d <= s)
                        return (0.5);
                    else
                        return (1);
            },
            calcFunction5(sign, d, q, s) {
                if (sign === "+")
                    if (d > s)
                        return (1);
                    else if (q < d && d <= s)
                        return ((d - q) / (s - q));
                    else
                        return (0);
                else if (sign === "-")
                    if (d > s)
                        return (0);
                    else if (q < d && d <= s)
                        return ((d - q) / (s - q));
                    else
                        return (1);
            },
            calcFunction6(sign, d, si) {
                if (sign === "+")
                    return (d > 0 ? 1 - Math.exp(-Math.pow(d, 2) / (2 * Math.pow(si, 2))) : 0);
                else
                    return (d <= 0 ? 1 - Math.exp(-Math.pow(d, 2) / (2 * Math.pow(si, 2))) : 0);
            },
            mainFunc(d, cr) {
                switch (cr.type) {
                    case this.critFunctionTypes[0] :
                        return this.calcFunction1(cr.sign, d);
                    case this.critFunctionTypes[1] :
                        return this.calcFunction2(cr.sign, d, cr.q);
                    case this.critFunctionTypes[2] :
                        return this.calcFunction3(cr.sign, d, cr.s);
                    case this.critFunctionTypes[3] :
                        return this.calcFunction4(cr.sign, d, cr.q, cr.s);
                    case this.critFunctionTypes[4] :
                        return this.calcFunction5(cr.sign, d, cr.q, cr.s);
                    case this.critFunctionTypes[5] :
                        return this.calcFunction6(cr.sign, d, cr.si);
                    default:
                        throw new Error("Неопознанный тип функции критерия");
                }
            },

            removeAlt(index) {
                this.alternatives.splice(index, 1);
                this.matrix.splice(index, 1);
            },

            removeCrit(index) {
                this.criterions.splice(index, 1);
                for (let i = 0; i < this.alternatives.length; i++) {
                    this.matrix[i].splice(index, 1);
                }
            }
        }
    }
</script>

<style scoped>
    input {
        border: solid black 1px;
    }
</style>