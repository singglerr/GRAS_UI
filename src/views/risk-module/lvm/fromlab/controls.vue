<template>
    <v-container fluid class="pa-0">
        <v-row dense v-if="!isLeaf()" class="pl-1 pr-1 pt-0">
            <v-col cols="12">
                <v-btn color="primary" @click="changeFunc" small width="100px">{{ getNode().func }}</v-btn>
            </v-col>
        </v-row>
        <v-row dense class="pb-2">
            <v-col cols="6">
                <v-btn color="primary" @click="newChild" x-small>+</v-btn>
            </v-col>
            <v-col cols="6">
                <v-btn color="primary" @click="remove" x-small>-</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        methods: {
            isLeaf() {
                return this.nodeData.children.length == 0;
            },
            getNode() {
                return this.$store.state.nodes[this.nodeData.id];
            },
            changeFunc() {
                this.$store.commit('ch', this.nodeData.id)
            },
            remove() {
                debugger
                this.$store.commit('del', {parent: this.nodeData.parent, removed: this.nodeData.id})
            },
            newChild() {
                this.$store.commit('add', {parent: this.nodeData.id, children:[], func: 'AND', losses: .1, prob: .1})
            }
        },
        props: {
            nodeData: Object,
        },
    }
</script>

<style scoped>
    .full-width {
        width: 100%;
    }
    .minSize {

    }
</style>