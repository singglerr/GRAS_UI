<template>
    <div>
        <table>
            <tbody>
                <tr>
                    <td class="td">
                        Вер-ть: 
                    </td>
                    <td v-if="isLeaf()">
                        <input 
                            type="text"
                            :id="'inp-prob-' + nodeData.id"
                            @input="probChanged($event)"
                            :tabindex="nodeData.id"
                            placeholder="0.1"
                        >
                    </td>
                    <td v-else>
                        <input 
                            type="text"
                            :id="'inp-prob-' + nodeData.id"
                            @input="probChanged($event)"
                            :tabindex="nodeData.id"
                            readonly
                            :value="('' + nodeData.prob)"
                        >
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    methods: {
        probChanged(e) {
            this.nodeData.prob = parseFloat(e.target.value);
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