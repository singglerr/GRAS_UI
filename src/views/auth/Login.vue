<template>
    <v-app id="inspire">
        <v-content class="back">
            <v-container
                    class="fill-height"
                    fluid
            >
                <Logo></Logo>

                <v-row
                        align="start"
                        justify="center"
                        no-gutters
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
                                <v-toolbar-title>Вход в систему</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-form>
                                    <v-text-field
                                            label="E-mail"
                                            name="email"
                                            prepend-icon="mdi-account"
                                            type="e-mail"
                                            v-model="email"
                                    ></v-text-field>

                                    <v-text-field
                                            id="password"
                                            label="Password"
                                            name="password"
                                            prepend-icon="mdi-lock"
                                            type="password"
                                            v-model="password"
                                    ></v-text-field>
                                </v-form>

                                <router-link class="ml-4" to="/login"><u>Забыли пароль?</u></router-link>
                            </v-card-text>
                            <v-card-actions>
                                <router-link class="ml-4" to="/register"><u>Нет аккаунта? Зарегистрироваться</u>
                                </router-link>

                                <v-spacer></v-spacer>

                                <v-btn class="mr-5 mb-5" color="primary" @click="login()">Войти</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
                <v-spacer></v-spacer>

                <v-snackbar v-model="snack" :timeout="4000" :color="snackColor">
                    {{ snackText }}

                    <template v-slot:action="{ attrs }">
                        <v-btn v-bind="attrs" text @click="snack = false">Close</v-btn>
                    </template>
                </v-snackbar>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import AuthAPI from "../../api/auth";
    import Logo from "../../components/Logo";
    import errors from "../../errors";

    export default {
        components: {Logo},
        data: () => ({
            password: "",
            email: "",
            snackColor: "",
            snackText: "",
            snack: false,
        }),
        methods: {
            login: async function () {
                try {
                    const email = this.email;
                    const password = this.password;

                    const res = await AuthAPI.login({email, password});

                    if (!res.data.success) {
                        switch (res.data.message) {
                            case errors.USER_NOT_FOUND: {
                                this.snack = true;
                                this.snackColor = "error";
                                this.snackText = "Пользователь с таким e-mail не найден!";
                                break;
                            }
                            case errors.USER_INCORRECT_PASSWORD: {
                                this.snack = true;
                                this.snackColor = "error";
                                this.snackText = "Неверный пароль!";
                                break;
                            }
                            default: {
                                this.snack = true;
                                this.snackColor = "error";
                                this.snackText = "Что-то пошло не так!";
                            }
                        }

                        return;
                    }

                    await this.$router.push({name: "home"});
                } catch (e) {
                    this.snack = true;
                    this.snackColor = "error";
                    this.snackText = "Что-то пошло не так!";
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
