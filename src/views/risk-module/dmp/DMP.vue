<template>
    <v-container>
        <v-card class="elevation-8 ma-4 pa-4">
            <v-card-title>Выбор наилучшей стратегии</v-card-title>

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
                "Данный метод предназначен для математически обоснованного выбора наилучшей стратегии. Этот выбор основан на статистических вероятностях переходов пациента из состояния в состояние и рассчитанных \"доходностях\" таких переходов.",
                "Для работы с методом нужно составить список состояний пациента и задать множество стратегий."
            ],
            inputDesc: "Множество состояний пациента, множество стратегий лечения, которые задаются верятностями переходов и \"доходностями\", связанными с этими переходами. Также требуется ввести количество этапов моделирования.",
            outputDesc: "Таблица наилучшей стратегии для каждого исходного состояния пациента на каждом этапе моделирования, а также граф этих переходов.",
        }),
    }
</script>

<style scoped>

</style>