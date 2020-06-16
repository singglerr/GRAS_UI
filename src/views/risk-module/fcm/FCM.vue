<template>
    <v-container>
        <v-card class="elevation-8 ma-4 pa-4">
            <v-card-title>Нечёткие когнитивные карты</v-card-title>

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
        name: "FCM",
        data: () => ({
            activeTab: "/modules/risk/fcm/concepts",
            tabs: [
                {id: 1, name: "Концепты", route: "/modules/risk/fcm/concepts"},
                {id: 2, name: "Матрица влияний", route: "/modules/risk/fcm/matrix"},
                {id: 3, name: "Граф", route: "/modules/risk/fcm/graph"},
                {id: 4, name: "Статическое моделирование", route: "/modules/risk/fcm/static"},
                // {id: 5, name: "Динамическое моделирование", route: "/modules/risk/fcm/dynamic"},
            ],
            descriptionParagraphs: [
                "Нечеткие когнитивные карты используются в качестве инструментария для синтеза, анализа и моделирования стратегий управления рисками пациентов, связанных с сопутствующим лечением при различных воздействиях внешних факторов, физических показателей, клинических и гериатрических синдромов и др.",
                "Данное программное средство позволяет строить НКК, визуализировать взаимосвязи рассматриваемых концептов, а также реализовывать динамическое моделирование.",
                "Динамическое моделирование ориентированно на исследование динамики поведения системы во времени, что позволит лучше оценить влияющие факторы и методы управления существующих рисков."
            ],
            inputDesc: "Клинические показатели, информация из гериатрических карт пациентов, взаимное влияние рассматриваемых факторов.",
            outputDesc: "Визуализация НКК, риски возникновения наблюдаемых синдромов и динамика их развития.",
        }),
    }
</script>