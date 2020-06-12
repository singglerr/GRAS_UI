<template>
    <v-app>
        <dashboard-core-app-bar :title="title"/>

        <dashboard-core-drawer />

        <dashboard-core-view />
    </v-app>
</template>

<script>
    export default {
        name: 'RiskModule',

        components: {
            DashboardCoreAppBar: () => import('./core/AppBar'),
            DashboardCoreDrawer: () => import('./core/Drawer'),
            DashboardCoreView: () => import('./core/View'),
        },

        data: () => ({
            title: `Модуль "Анализ рисков"`,
        }),
    }
</script>