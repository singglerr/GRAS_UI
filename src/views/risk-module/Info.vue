<template>
    <v-container>
        <v-card class="elevation-8 ma-4">
            <v-card-title>О модуле</v-card-title>

            <v-card-text>
                <p class="mb-0" v-for="description in descriptionParagraphs">{{description}}</p>
                <p class="mt-1"><h3>Входные данные: </h3>{{inputDesc}}</p>
                <p><h3>Выходные данные: </h3>{{outputDesc}}</p>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        name: "Info",
        data: () => ({
            descriptionParagraphs: ["Исследование и решение проблем управления индивидуальными и групповыми рисками в гериатрии.",
                "Исследования, объектом которых являются риски в гериатрии, связаны с формализацией рисков, выбором мер риска, установлением связи между имеющимися, разработанными шкалами и рисками, классификацией рисков.",
                "Модуль анализа рисков включает в себя процедуры:",
                "• Идентификации рисков;",
                "• Оценки индивидуальных и групповых рисков;",
                "• Управления рисками.",
                "При идентификации, оценке и управлении индивидуальными и групповыми рисками, предлагается использовать следующие математические модели:",
                "1. Логико-вероятностный метод (ЛВМ), (в качестве инициирующих событий выступают события, вероятностные характеристики которых, получены из медико-статистического анализа гериатрических данных);",
                "2. Дискретные марковские процессы с доходностями;",
                "3. Аппарат нечетких когнитивных карт используются при идентификации и оценке группового риска;",
            ],
            inputDesc: "Данные статистического анализа, данные гериатрических карт и результаты работы гериатрических калькуляторов.",
            outputDesc: "Индивидуальные карты рисков, оценки групповых рисков, рекомендации по управлению рисками."
        }),
    }
</script>

<style scoped>

</style>