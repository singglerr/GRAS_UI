<template>
    <div class="full-width">
        <table class="full-width">
            <tr class="full-width">
                <td class="full-width" v-if="!(isLeaf())">
                    <button class="full-width" @click="changeFunc">{{ getNode().func }}</button>
                </td>
                <td class="full-width">
                    <button class="full-width" @click="newChild">+</button>
                </td>
                <td class="full-width">
                    <button class="full-width" @click="remove">-</button>
                </td>
            </tr>
        </table>
    </div>
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
</style>