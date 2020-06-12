<template>
    <v-app id="inspire">
        <v-content class="back">
            <v-container
                    class="fill-height"
                    fluid
            >
                <Logo></Logo>

                <v-row
                        align="center"
                        justify="center"
                >
                    <v-col
                            cols="12"
                            sm="8"
                            md="4"
                    >
                        <v-card class="elevation-12">
                            <v-toolbar
                                    color="primary"
                                    dark
                                    flat
                            >
                                <router-link to="/login">
                                    <v-icon class="mr-6">mdi-arrow-left</v-icon>
                                </router-link>
                                <v-toolbar-title>Регистрация</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-form>
                                    <v-text-field
                                            label="E-mail"
                                            name="email"
                                            prepend-icon="mdi-account"
                                            type="email"
                                            v-model="email"
                                    ></v-text-field>

                                    <v-text-field
                                            label="E-mail confirm"
                                            name="emailConfirm"
                                            prepend-icon="mdi-account"
                                            type="email"
                                            v-model="emailConfirm"
                                    ></v-text-field>

                                    <v-text-field
                                            label="Name"
                                            name="name"
                                            prepend-icon="mdi-account-details"
                                            type="text"
                                            v-model="name"
                                    ></v-text-field>

                                    <v-text-field
                                            id="password"
                                            label="Password"
                                            name="password"
                                            prepend-icon="mdi-lock"
                                            type="password"
                                            v-model="password"
                                    ></v-text-field>

                                    <v-text-field
                                            id="passConfirm"
                                            label="Password confirm"
                                            name="passConfirm"
                                            prepend-icon="mdi-lock"
                                            type="password"
                                            v-model="passConfirm"
                                    ></v-text-field>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn class="mr-5 mb-5" color="primary" @click="register()">Зарегистрироваться</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import AuthAPI from "../../api/auth";
    import Logo from "../../components/Logo";

    export default {
        components: {Logo},
        data: () => ({
            password: "",
            passConfirm: "",
            email: "",
            emailConfirm: "",
            name: "",

        }),
        methods: {
            register: async function () {
                try {
                    const email = this.email;
                    const name = this.name;
                    const password = this.password;
                    const passConfirm = this.passConfirm;

                    let res = await AuthAPI.signup({name, email, password, passConfirm});
                    if (!res.data.success) {
                        //TODO обработка ошибок регистрации

                        return;
                    }

                    res = await AuthAPI.login({email, password});
                    if (res.data.success) {
                        this.$store.commit("login");
                        this.$router.push({name: "home"});
                    } else {
                        this.$router.push({name: "login"});
                    }
                } catch (e) {
                    console.log("catch", e);
                }
            }
        }
    }
</script>

<style>
    .back {
        background-image: url("../../assets/52c1edd6ba4c1.jpg");
        background-size: cover;
        background-repeat: no-repeat;
    }
</style>
