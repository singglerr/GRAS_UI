<template>
	<v-app id="inspire">
		<v-content class="back">
			<v-container
				class="fill-height"
				fluid
			>
				<v-row
					align="center"
					justify="center"
				>
					<v-col
						cols="12"
						sm="8"
						md="3"
					>
						<v-img class="elevation-12" src="../assets/gras_icon.jpg" width="100%"></v-img>
					</v-col>

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

								<router-link class="ml-4" to="/register"><u>Забыли пароль?</u></router-link>
							</v-card-text>
							<v-card-actions>
								<router-link class="ml-4" to="/register"><u>Нет аккаунта? Зарегистрироваться</u></router-link>

								<v-spacer></v-spacer>

								<v-btn class="mr-5 mb-5" color="primary" @click="login()">Войти</v-btn>
							</v-card-actions>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
		</v-content>
	</v-app>
</template>

<script>
	import AuthService from "../services/AuthService";

	export default {
		data: () => ({
			password: "",
			email: "",
		}),
		methods: {
			login: async function () {
				try {
					const email = this.email;
					const password = this.password;
					console.log(1, email, password);
					const res = await AuthService.login({email, password});
					// console.log(res);
				} catch (e) {
					console.log("catch", e);
				}
			}
		}
	}
</script>

<style>
	.back {
		background-image: url("../assets/login-register-back.jpg");
		background-size: cover;
		background-repeat: no-repeat;
	}
</style>
