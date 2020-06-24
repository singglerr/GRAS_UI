<template>
	<v-container fluid class="pt-0">
		<v-card flat width="650px" class="pb-0 pt-0">
			<v-card-title class="pb-0 pt-0">
				Вероятность возникновения опасной ситуации:
				<v-text-field class="ml-2" v-model="this.$store.state.prob" style="width: 100px" readonly></v-text-field>
			</v-card-title>
		</v-card>

		<organization-chart :datasource="build()" :zoom="true" :pan="true">
			<node slot-scope="{ nodeData }" :node-data="nodeData"></node>
		</organization-chart>
	</v-container>
</template>

<script>
	import 'vue'
	import Node from './node'
	import OrganizationChart from 'vue-organization-chart'
	import 'vue-organization-chart/dist/orgchart.css'
	export default {
		components: {
			Node,
			OrganizationChart
		},
		methods: {
			build() {
				const tree = this.$store.getters.build();
				this.prob = this.$store.state.nodes[0].prob;
				return tree;
			}
		},
		created() {
			this.prob = this.$store.state.nodes[0].prob
		},
		data: () => ({
			prob: .1,
		}),
	}
</script>

<style>
	:root {
		--main-color: #35ce96;
	}
	.orgchart, .node, .title {
		background-image: none !important;
		background-color: #fff !important;
		color: black !important;
	}
	.node {
		background-color: none !important;		
	}
	.topLine, .downLine, .leftLine, .rightLine {
		border-left-color: var(--main-color) !important;
		border-right-color: var(--main-color) !important;
		border-top-color: var(--main-color) !important;
	}
	.downLine {
		background-color: var(--main-color) !important;
	}
</style>