<template>
    <v-footer
            id="dashboard-core-footer"
            absolute
            dense
            color="primary"
    >
        <v-container>
            <v-row
                    align="center"
                    no-gutters
            >
                <v-col
                        cols="12"
                >
                    <div class="body-1 font-weight-light pt-6 pt-md-0 text-center">
                        &copy; 2020 &mdash; Danil Usov & Antonina Tverdokhlebova, USATU
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </v-footer>
</template>

<script>
    export default {
        name: 'DashboardCoreFooter',

        data: () => ({
            links: [
                {
                    href: "/modules/risk/lvm",
                    text: 'Creative Tim',
                },
                {
                    href: '/modules/risk/dmp',
                    text: 'About Us',
                },
                {
                    href: '/modules/risk/fcm',
                    text: 'Blog',
                },
                {
                    href: '#',
                    text: 'Licenses',
                },
            ],
        }),
    }
</script>

<style lang="sass">
    #dashboard-core-footer
        a
            font-size: .825rem
            font-weight: 500
            text-decoration: none
            text-transform: uppercase
</style>
