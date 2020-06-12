<template>
    <v-app-bar
            id="app-bar"
            app
            color="primary"
            flat
            class="elevation-8"
    >
        <v-toolbar-title style="color: #ffffff" class="ml-4">{{ title }}</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn
                class="ml-2"
                min-width="0"
                text
        >
            <v-icon>mdi-account</v-icon>
        </v-btn>
    </v-app-bar>
</template>

<script>
    export default {
        name: "AppBar",
        props: ["title"],
        data: () => ({}),
    }
</script>
