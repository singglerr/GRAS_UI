<template>
    <v-container fluid class="pa-0">
        <v-row dense no-gutters class="pa-0">
            <v-col>
                Вероятность:
            </v-col>
        </v-row>
        <v-row dense v-if="isLeaf()">
            <v-text-field
                    type="number"
                    :id="'inp-prob-' + nodeData.id"
                    @input="probChanged($event)"
                    :tabindex="nodeData.id"
                    placeholder="0.1"
                    v-model="nodeData.prob"
                    dense
                    class="pl-3 pr-3"
            ></v-text-field>
        </v-row>
        <v-row dense v-else>
            <v-text-field
                    type="number"
                    :id="'inp-prob-' + nodeData.id"
                    @input="probChanged($event)"
                    :tabindex="nodeData.id"
                    readonly
                    v-model="nodeData.prob"
                    dense
                    class="pl-3 pr-3"
            ></v-text-field>
        </v-row>
    </v-container>

</template>

<script>
export default {
    methods: {
        probChanged(e) {
            this.nodeData.prob = parseFloat(e);
            console.log(e);
            if (e < 0) {
                this.nodeData.prob = 0;
            } else if (e > 1) {
                this.nodeData.prob = 1;
            }

            this.$store.commit('upd', this.nodeData)
        },
        isLeaf() {
            return this.nodeData.children.length == 0;
        },
    },
    props: {
        nodeData: Object,
    },
}
</script>

<style scoped>
    .td {
        padding: 2px;
        text-align: left !important;
    }
</style>