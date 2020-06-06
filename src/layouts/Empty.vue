<template>
	<div>
		<slot/>
	</div>
</template>

<script>
	export default {
		meta: [
			{name:"viewport", content: "width=device-width, initial-scale=1.0"}
		],

		head: {
			link: [
				{
					rel: "stylesheet",
					href: "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"
				},
				{
					rel: "stylesheet",
					href: "https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css"
				},
			]
		}
	}
</script>

<style>

</style>
