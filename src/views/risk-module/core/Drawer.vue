<template>
    <v-navigation-drawer
            v-model="drawer"
            :color="color"
            :expand-on-hover="expandOnHover"
            :mini-variant="miniVariant"
            :permanent="permanent"
            dark
            width="310"
            app
            class="elevation-8"
    >
        <v-list
                dense
                nav
                class="py-0"
        >
            <v-list-item two-line :class="miniVariant && 'px-0'">
                <v-list-item-avatar>
                        <img src="../../../assets/11111111111.png"/>
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title><h3>Система анализа</h3></v-list-item-title>
                    <v-list-item-title><h3>гериатрических рисков</h3></v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list-item
                    v-for="item in items"
                    :key="item.title"
                    link
                    :to="item.to"
                    exact
            >
                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>

        <dashboard-core-footer/>
    </v-navigation-drawer>
</template>

<script>
    export default {
        data() {
            return {
                drawer: true,
                items: [
                    {title: 'На главную', icon: 'mdi-home', to:"/"},
                    {title: 'О модуле', icon: 'mdi-information-outline', to:"/modules/risk/"},
                    {title: 'Логико-вероятностный метод', icon: 'mdi-crosshairs-question', to:"/modules/risk/lvm"},
                    {title: 'Дискретные марковские процессы', icon: 'mdi-strategy', to:"/modules/risk/dmp"},
                    {title: 'Нечеткие когнитивные карты', icon: 'mdi-view-dashboard', to:"/modules/risk/fcm"},
                ],
                color: 'primary',
                right: false,
                permanent: false,
                miniVariant: false,
                expandOnHover: false,
            }
        },
        components: {
            DashboardCoreFooter: () => import('./Footer'),
        },
    }
</script>

<style lang="sass">
    @import '../../../../node_modules/vuetify/src/styles/tools/rtl'

    #core-navigation-drawer
        .v-list-group__header.v-list-item--active:before
            opacity: .24

        .v-list-item
            &__icon--text,
            &__icon:first-child
                justify-content: center
                text-align: center
                width: 20px

                +ltr()
                    margin-right: 24px
                    margin-left: 12px !important

                +rtl()
                    margin-left: 24px
                    margin-right: 12px !important

        .v-list--dense
            .v-list-item
                &__icon--text,
                &__icon:first-child
                    margin-top: 10px

        .v-list-group--sub-group
            .v-list-item
                +ltr()
                    padding-left: 8px

                +rtl()
                    padding-right: 8px

            .v-list-group__header
                +ltr()
                    padding-right: 0

                +rtl()
                    padding-right: 0

                .v-list-item__icon--text
                    margin-top: 19px
                    order: 0

                .v-list-group__header__prepend-icon
                    order: 2

                    +ltr()
                        margin-right: 8px

                    +rtl()
                        margin-left: 8px
</style>
