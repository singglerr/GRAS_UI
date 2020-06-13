<template>
    <v-container>
        <v-card class="elevation-8 ma-4 pa-4">
            <v-card-title>Дискретные марковские процессы</v-card-title>

            <v-card-text>
                <p class="mb-0" v-for="description in descriptionParagraphs">{{description}}</p>
                <p class="mt-1"><h3>Входные данные: </h3>{{inputDesc}}</p>
                <p><h3>Выходные данные: </h3>{{outputDesc}}</p>
            </v-card-text>

            <v-tabs v-model="activeTab" grow >
                <v-tabs-slider></v-tabs-slider>

                <v-tab v-for="tab of tabs" :key="tab.id" :to="tab.route" exact >
                    {{ tab.name }}
                </v-tab>
            </v-tabs>
            <router-view></router-view>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        name: "DMP",
        data: () => ({
            activeTab: "/modules/risk/dmp/state",
            tabs: [
                {id: 1, name: "Состояния", route: "/modules/risk/dmp/states"},
                {id: 2, name: "Стратегии", route: "/modules/risk/dmp/strategies"},
                {id: 3, name: "Моделирование", route: "/modules/risk/dmp/model"},
            ],
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