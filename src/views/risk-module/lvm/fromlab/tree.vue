<template>
	<div style="height: 100%; width: 100%">
		<organization-chart :datasource="build()" :zoom="true" :pan="true" >
			<node slot-scope="{ nodeData }" :node-data="nodeData"></node>
		</organization-chart>
	</div>
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
				return this.$store.getters.build()
			}
		}
	}
</script>

<style>
	:root {
		--main-color: blue;
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