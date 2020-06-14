<template>
    <router-view/>
</template>

<script>
    import AuthService from "./api/auth";
    import config from "./config";

    export default {
        name: 'App',

        data: () => ({
            //
        }),

        beforeCreate: async function () {
            try {
                const res = await AuthService.isLoggedIn();

                if (res.data.isLoggedIn) {
                    this.$store.commit("login");
                    this.$router.push({name: "home"});
                }
            } catch (e) {
                console.log(e)
            }
        }
    };
</script>

<style>

</style>