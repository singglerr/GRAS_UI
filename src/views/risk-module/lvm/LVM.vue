<template>
    <v-container>
        <v-card class="elevation-8 ma-4 pa-4">
            <v-card-title>Оценка риска по сценарию</v-card-title>

            <v-card-text>
                <p class="mb-0" v-for="description in descriptionParagraphs">{{description}}</p>
                <p class="mt-1"><h3>Входные данные: </h3>{{inputDesc}}</p>
                <p><h3>Выходные данные: </h3>{{outputDesc}}</p>
            </v-card-text>

            <router-view></router-view>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        name: "LVM",
        data: () => ({
            descriptionParagraphs: [
                ""
            ],
            inputDesc: "",
            outputDesc: "",
        }),
    }
</script>

<style scoped>

</style>