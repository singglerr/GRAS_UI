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
    import errors from "../../errors"

    export default {
        components: {Logo},
        data: () => ({
            password: "",
            passConfirm: "",
            email: "",
            emailConfirm: "",
            name: "",
            snackColor: "",
            snackText: "",
            snack: false,
        }),
        methods: {
            register: async function () {
                try {
                    const email = this.email;
                    const emailConfirm = this.emailConfirm;
                    const name = this.name;
                    const password = this.password;
                    const passConfirm = this.passConfirm;

                    if (email !== emailConfirm) {
                        this.snack = true;
                        this.snackColor = "error";
                        this.snackText = "E-mail не совпадают!";
                        return
                    }

                    let res = await AuthAPI.signup({name, email, password, passConfirm});
                    if (!res.data.success) {
                        switch (res.data.message) {
                            case errors.MISSING_CREDENTIALS: {
                                this.snack = true;
                                this.snackColor = "error";
                                this.snackText = "Заполните все поля!";
                                break;
                            }
                            case errors.PASSWORD_MISMATCH: {
                                this.snack = true;
                                this.snackColor = "error";
                                this.snackText = "Пароли не совпадают!";
                                break;
                            }
                            case errors.USER_ALREADY_EXISTS: {
                                this.snack = true;
                                this.snackColor = "error";
                                this.snackText = "Пользователь с таким e-mail же зарегистрирован!";
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

                    res = await AuthAPI.login({email, password});
                    if (res.data.success) {
                        this.$router.push({name: "home"});
                    } else {
                        this.$router.push({name: "login"});
                    }
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
