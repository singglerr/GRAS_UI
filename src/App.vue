<template>
    <v-app>
        <component :is="layout">
            <router-view/>
        </component>
    </v-app>
</template>

<script>
    import AuthService from "./api/auth";
    import config from "./config";

    export default {
        name: 'App',

        data: () => ({
            //
        }),
        computed: {
            layout() {
                return (this.$route.meta.layout || config.DEFAULT_LAYOUT) + "-layout";
            }
        },

        beforeCreate: async function () {
            try {
                const res = await AuthService.isLoggedIn();

                if (res.data.isLoggedIn) {
                    this.$store.commit("login");
                    this.$router.go(-1);
                }
            } catch (e) {
                console.log(e)
            }
        }
    };
</script>

<style>

</style>