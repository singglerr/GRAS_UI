<template>
	<div id="app">
		<component :is="layout">
			<router-view />
		</component>
	</div>
</template>

<script>
	import config from "./config"

	export default {
		computed: {
			layout() {
				return (this.$route.meta.layout || config.DEFAULT_LAYOUT) + "-layout";
			}
		}
	}
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
		text-align: center;
	}
</style>
