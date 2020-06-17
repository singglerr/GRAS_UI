<template>
    <div>
        KINI-raif <br/><br/>

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
                    <input type="radio" name="state" id="plus"
                           value="+" v-model="newCrit.sign"/>
                    <label for="plus"> Положительно направленный</label> <br/><br/>
                    <input type="radio" name="state" id="minus"
                           value="-" v-model="newCrit.sign"/>
                    <label for="minus"> Отрицательно направленный</label> <br/><br/>


                    <div>
                        <span>Критерии:</span>
                        <div v-for="(crit, index) in criterions"
                             :key="crit.name+index">
                            <span> {{index}}</span>
                            <span>{{crit.name}}</span>
                            <span @click="upCrit(index)"> up </span>
                            <span @click="downCrit(index)"> down </span>
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
                    {{crit.name}} {{crit.sign}}
                </th>
            </tr>
            <tbody>
            <tr v-for="(alt, i) in alternatives">
                <th>{{alt}}</th>
                <td v-for="(crit, j) in criterions">
                    <input type="number" v-model.number="matrix[i][j]">
                </td>
            </tr>
            <tr>
                <th>b</th>
                <td v-for="(crit, j) in criterions">
                    <input type="number" v-model.number="b[j]">
                </td>
            </tr>
            <tr>
                <th>w</th>
                <td v-for="(crit, j) in criterions">
                    <input type="number" v-model.number="w[j]">
                </td>
            </tr>
            <tr>
                <th>m0.25</th>
                <td v-for="(crit, j) in criterions">
                    <input type="number" v-model.number="m025[j]">
                </td>
            </tr>
            <tr>
                <th>m0.5</th>
                <td v-for="(crit, j) in criterions">
                    <input type="number" v-model.number="m050[j]">
                </td>
            </tr>
            </tbody>
            <tr>
                <th>m0.75</th>
                <td v-for="(crit, j) in criterions">
                    <input type="number" v-model.number="m075[j]">
                </td>
            </tr>

        </table>

        <template v-if="criterions.length>1">
            <div v-for="i in (criterions.length-1)">
                оценка по критерию {{criterions[0].name}} , которая равна лучшей оценке по {{criterions[i].name}}
                <input type="number" v-model.number="x[i]">
            </div>
        </template>


        lambda
        {{lambda}}

        altPriority
        {{alternativesPriority}}

        sorted
        {{sortedAlts}}

    </div>
</template>

<script>
    export default {
        name: "Kini-Raif",
        data: () => ({
            // count_alt: 1,
            // count_crit: 1,
            isAltDialogVisible: false,
            isCritDialogVisible: false,

            newAltName: '',

            alternatives: [],
            criterions: [],

            newCrit: {sign: "+", name: ''},
            matrix: [],

            b: [],
            w: [],
            m025: [],
            m050: [],
            m075: [],
            x: [],

            calculated: false,
            //for debug

            lambda: [],
            alternativesPriority: [],
            sortedAlts: [],
        }),
        methods: {
            onCloseAltDialog() {
                this.isAltDialogVisible = false;
                this.newAltName = '';
            },
            onSaveAltDialog() {
                this.matrix.push([]);
                this.alternatives.push(this.newAltName);
                this.newAltName = '';
            },

            onCloseCritDialog() {
                this.isCritDialogVisible = false;
                this.newCrit = {
                    sign: "+",
                    name: '',
                };
            },
            onSaveCritDialog() {
                this.criterions.push({...this.newCrit});

                this.newCrit = {
                    sign: "+",
                    name: '',
                };
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
            },
            upCrit(index) {
                if (index === 0) {
                    return;
                }
                let tmp = this.criterions.slice(index - 1, index + 1);
                tmp.reverse();
                this.criterions.splice(index - 1, 2, ...tmp);

                tmp = this.w[index];
                this.w[index] = this.w[index - 1];
                this.w[index - 1] = tmp;

                tmp = this.b[index];
                this.b[index] = this.b[index - 1];
                this.b[index - 1] = tmp;

                tmp = this.m025[index];
                this.m025[index] = this.m025[index - 1];
                this.m025[index - 1] = tmp;

                tmp = this.m050[index];
                this.m050[index] = this.m050[index - 1];
                this.m050[index - 1] = tmp;

                tmp = this.m075[index];
                this.m075[index] = this.m075[index - 1];
                this.m075[index - 1] = tmp;

                for (let i = 0; i < this.alternatives.length; i++) {
                    tmp = this.matrix[i][index];
                    this.matrix[i][index] = this.matrix[i][index - 1];
                    this.matrix[i][index - 1] = tmp;
                }
            },

            downCrit(index) {
                if (index === this.criterions.length - 1) {
                    return;
                }

                let tmp = this.criterions.slice(index, index + 2);
                tmp.reverse();
                this.criterions.splice(index, 2, ...tmp);

                tmp = this.w[index];
                this.w[index] = this.w[index + 1];
                this.w[index + 1] = tmp;

                tmp = this.b[index];
                this.b[index] = this.b[index + 1];
                this.b[index + 1] = tmp;

                tmp = this.m025[index];
                this.m025[index] = this.m025[index + 1];
                this.m025[index + 1] = tmp;

                tmp = this.m050[index];
                this.m050[index] = this.m050[index + 1];
                this.m050[index + 1] = tmp;

                tmp = this.m075[index];
                this.m075[index] = this.m075[index + 1];
                this.m075[index + 1] = tmp;

                for (let i = 0; i < this.alternatives.length; i++) {
                    tmp = this.matrix[i][index];
                    this.matrix[i][index] = this.matrix[i][index + 1];
                    this.matrix[i][index + 1] = tmp;
                }
            },

            //TODO найти багу, скорее всего здесь
            //возможно пропущена +0, +0.25, +0.75
            calculateCriterion(critIndex, calcValue) {
                if (this.criterions[critIndex].sign === '+') {
                    if (this.w[critIndex] <= calcValue && calcValue < this.m025[critIndex]) {//w-0.25
                        console.log(`y=x/${4 * (this.m025[critIndex] - this.w[critIndex])}-${0.25 * this.w[critIndex] / (this.m025[critIndex] - this.w[critIndex])}`);
                        return 0.25 * (calcValue - this.w[critIndex]) / (this.m025[critIndex] - this.w[critIndex]);
                    } else if (this.m025[critIndex] <= calcValue && calcValue <= this.m050[critIndex]) {//0.25-0.5
                        console.log(`y=x/${4 * (this.m050[critIndex] - this.m025[critIndex])}+0.25-${0.25 * this.m025[critIndex] / (this.m050[critIndex] - this.m025[critIndex])}`);
                        return 0.25 + 0.25 * (calcValue - this.m025[critIndex]) / (this.m050[critIndex] - this.m025[critIndex]);
                    } else if (this.m050[critIndex] <= calcValue && calcValue <= this.m075[critIndex]) {//0.5-0.75
                        console.log(`y=x/${4 * (this.m075[critIndex] - this.m050[critIndex])}+0.5-${0.25 * this.m050[critIndex] / (this.m075[critIndex] - this.m050[critIndex])}`);
                        return 0.5 + 0.25 * (calcValue - this.m050[critIndex]) / (this.m075[critIndex] - this.m050[critIndex]);
                    } else if (this.m075[critIndex] <= calcValue && calcValue <= this.b[critIndex]) {//0.75-b
                        console.log(`y=x/${4 * (this.b[critIndex] - this.m075[critIndex])}+0.75-${0.25 * this.m075[critIndex] / (this.b[critIndex] - this.m075[critIndex])}`);
                        return 0.75 + 0.25 * (calcValue - this.m075[critIndex]) / (this.b[critIndex] - this.m075[critIndex]);
                    } else {
                        throw new Error(`Значение ${calcValue} за границами критерия #${critIndex}`);
                    }
                } else {
                    if (this.w[critIndex] >= calcValue && calcValue > this.m025[critIndex]) {//w-0.25
                        console.log(`y=x/${4 * (this.m025[critIndex] - this.w[critIndex])}-${0.25 * this.w[critIndex] / (this.m025[critIndex] - this.w[critIndex])}`);
                        return 0.25 * (calcValue - this.w[critIndex]) / (this.m025[critIndex] - this.w[critIndex]);
                    } else if (this.m025[critIndex] >= calcValue && calcValue >= this.m050[critIndex]) {//0.25-0.5
                        console.log(`y=x/${4 * (this.m050[critIndex] - this.m025[critIndex])}+0.25-${0.25 * this.m025[critIndex] / (this.m050[critIndex] - this.m025[critIndex])}`);
                        return 0.25 + 0.25 * (calcValue - this.m025[critIndex]) / (this.m050[critIndex] - this.m025[critIndex]);
                    } else if (this.m050[critIndex] >= calcValue && calcValue >= this.m075[critIndex]) {//0.5-0.75
                        console.log(`y=x/${4 * (this.m075[critIndex] - this.m050[critIndex])}+0.5-${0.25 * this.m050[critIndex] / (this.m075[critIndex] - this.m050[critIndex])}`);
                        return 0.5 + 0.25 * (calcValue - this.m050[critIndex]) / (this.m075[critIndex] - this.m050[critIndex]);
                    } else if (this.m075[critIndex] >= calcValue && calcValue >= this.b[critIndex]) {//0.75-b
                        console.log(`y=x/${4 * (this.b[critIndex] - this.m075[critIndex])}+0.75-${0.25 * this.m075[critIndex] / (this.b[critIndex] - this.m075[critIndex])}`);
                        return 0.75 + 0.25 * (calcValue - this.m075[critIndex]) / (this.b[critIndex] - this.m075[critIndex]);
                    } else {
                        throw new Error(`Значение ${calcValue} за границами критерия #${critIndex}`);
                    }
                }

            },
            calculate() {

                let lambdasCoeff = [1];
                let coeffsSum = 1;
                for (let i = 1; i < this.criterions.length; i++) {
                    lambdasCoeff[i] = this.calculateCriterion(0, this.x[i]);
                    coeffsSum += lambdasCoeff[i];
                }
                const L1 = 1 / coeffsSum;
                this.lambda = [L1];
                for (let i = 1; i < this.criterions.length; i++) {
                    this.lambda[i] = L1 * lambdasCoeff[i];
                }

                this.alternativesPriority = [];

                for (let altInd = 0; altInd < this.alternatives.length; altInd++) {
                    this.alternativesPriority[altInd] = 0;
                    for (let critInd = 0; critInd < this.criterions.length; critInd++) {
                        const mark = this.calculateCriterion(critInd, this.matrix[altInd][critInd]);
                        console.log(`Оценка ${this.alternatives[altInd]} по ${this.criterions[critInd].name} = ${mark}`);
                        this.alternativesPriority[altInd] += this.lambda[critInd] * mark;
                    }
                }

                const tmpSortKeys = [...this.alternativesPriority];
                const tmpSortedAlts = [...this.alternatives];

                for (let i = 0; i < tmpSortedAlts.length; i++) {
                    for (let j = i + 1; j < tmpSortedAlts.length; j++) {
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

            }
        }
    }
</script>

<style scoped>
    input {
        border: solid black 1px;
    }
</style>