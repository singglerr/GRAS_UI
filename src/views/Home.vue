<template>
    <v-content>
        <div id="home">
            <nav class="navbar navbar-default">
                <div class="container">
                    <!-- Brand and toggle get grouped for better mobile display -->
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                                data-target="#navbar-collapse-2">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <a class="navbar-brand">
                            <strong><big>СИСТЕМА АНАЛИЗА ГЕРИАТРИЧЕСКИХ РИСКОВ</big></strong>
                        </a>
                    </div>

                    <!-- Collect the nav links, forms, and other content for toggling -->
                    <div class="collapse navbar-collapse" id="navbar-collapse-2">
                        <ul class="nav navbar-nav navbar-right">
                            <li>
                                <a class="btn btn-default btn-outline btn-circle" data-toggle="collapse"
                                   aria-expanded="false" aria-controls="nav-collapse2" @click="logout()">Выход</a>
                            </li>
                        </ul>
                    </div><!-- /.navbar-collapse -->
                </div><!-- /.container -->
            </nav><!-- /.navbar -->

            <div class="welcome-grids">
                <div class="container">
                    <div class="col-md-3 welcome-grid text-center">
                        <div class="ih-item circle effect9 left_to_right">
                            <a href="/">
                                <div class="img">
                                    <img src="../assets/ведение гериатрических карт1.jpg" alt=""/>
                                </div>
                                <div class="info">
									<p>&nbsp;</p>
									<p class="delimiter">&nbsp;</p>
									<h4>Формирование, редактирование, хранение и обработка данных цифровой
                                        версии гериатрической карты пациента</h4>
                                </div>
                            </a>
                        </div>
                    </div>

                    <div class="col-md-3 welcome-grid text-center">
                        <div class="ih-item circle effect9 left_to_right">
                            <a href="/">
                                <div class="img"><img src="../assets/статистический анализ данных1.jpg" alt=""/></div>
                                <div class="info">
                                    <p class="delimiter">&nbsp;</p>
                                    <p class="delimiter">&nbsp;</p>
                                    <h4>Обработка информации для проведения медико-статистического анализа
                                        данных в гериатрии</h4>
                                </div>
                            </a>
                        </div>
                    </div>

                    <div class="col-md-3 welcome-grid text-center">
                        <div class="ih-item circle effect9 left_to_right">
                            <a href="/">
                                <div class="img"><img src="../assets/гериатрические калькуляторы1.jpg" alt=""/></div>
                                <div class="info">
                                    <p class="delimiter">&nbsp;</p>
                                    <h4>Оценка у больного гериатрических показателей физического и психического
                                        здоровья, социально-демографического статуса и др.</h4>
                                </div>
                            </a>
                        </div>
                    </div>

                    <div class="col-md-3 welcome-grid text-center">
                        <div class="ih-item circle effect9 left_to_right">
                            <a href="/">
                                <div class="img"><img src="../assets/формирование методик лечения1.jpg" alt=""/></div>
                                <div class="info">
                                    <p class="delimiter">&nbsp;</p>
                                    <p class="delimiter">&nbsp;</p>
                                    <h4>Построение и формализация множества схем лечения конкретной
                                        нозологии</h4>
                                </div>
                            </a>
                        </div>
                    </div>

                    <p class="delimiter">&nbsp;</p>

                    <div class="col-md-3 welcome-grid text-center">
                        <div class="ih-item circle effect9 left_to_right">
                            <a href="/">
                                <div class="img"><img src="../assets/оценка эффективности лечения1.jpg" alt=""/></div>
                                <div class="info">
                                    <p class="delimiter">&nbsp;</p>
                                    <p class="delimiter">&nbsp;</p>
                                    <h4>Многокритериальная оценка эффективности врачебного вмешательства</h4>
                                </div>
                            </a>
                        </div>
                    </div>

                    <div class="col-md-3 welcome-grid text-center">
                        <div class="ih-item circle effect9 left_to_right">
                            <router-link to="/modules/risk/">
                                <div class="img"><img src="../assets/анализ рисков1.jpg" alt=""/></div>
                                <div class="info">
                                    <p class="delimiter">&nbsp;</p>
                                    <p class="delimiter">&nbsp;</p>
                                    <h4>Исследование,решение проблем управления индивидуальными и групповыми
                                        рисками в гериатрии</h4>
                                </div>
                            </router-link>
                        </div>
                    </div>

                    <div class="col-md-3 welcome-grid text-center">
                        <div class="ih-item circle effect9 left_to_right">
                            <a href="/">
                                <div class="img"><img src="../assets/формирование карт рисков1.jpg" alt=""/></div>
                                <div class="info">
                                    <p class="delimiter">&nbsp;</p>
                                    <p class="delimiter">&nbsp;</p>
                                    <h4>Систематизация и визуализация рисков гериатрических больных</h4>
                                </div>
                            </a>
                        </div>
                    </div>

                    <div class="col-md-3 welcome-grid text-center">
                        <div class="ih-item circle effect9 left_to_right">
                            <a href="/">
                                <div class="img"><img src="../assets/выбор лучшей методики лечения1.jpg" alt="A"/></div>
                                <div class="info">
                                    <p class="delimiter">&nbsp;</p>
                                    <p class="delimiter">&nbsp;</p>
                                    <h4>Выбор лучшего для пациента набора лечебно-профилактических
                                        процедур</h4>
                                </div>
                            </a>
                        </div>
                    </div>

                    <div class="clearfix"></div>
                </div>
            </div>
        </div>
    </v-content>
</template>

<script>
    import AuthAPI from "../api/auth";

    export default {
        data: function () {
            return {
                title: "САГР - Главная",
            }
        },

        methods: {
            logout: async function () {
                const res = await AuthAPI.logout();

                if (res.data.success) {
                    this.$store.commit("logout");

                    this.$router.push({name: "login"});
                }
            }
        },

        head: {
            title: function () {
                return {
                    inner: this.title
                };
            },
            meta: [
                {"http-equiv": "content-type", content: "text/html; charset=UTF-8"},
                {name: "viewport", content: "width=device-width, initial-scale=1.0"}
            ],
            link: [
                {
                    rel: "stylesheet",
                    href: "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css"
                },
                {
                    rel: "stylesheet",
                    href: "https://bootstraptema.ru/snippets/effect/2017/ihover9/ihover.css"
                },
                {
                    rel: "stylesheet",
                    href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css",
                }
            ],
            script: [
                {src: "https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.min.js"},
                {src: "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js"},
            ]
        }
    }
</script>

<style type="text/css">
    .col-md-3.welcome-grid.text-center {
        padding: 15px;
    }

    p.delimiter {
        height: 21px;
    }

	.ih-item.circle.effect9 .info {
		background-color: #ffffff !important;
		border-color: #ffffff !important;
		vertical-align: middle !important;
	}

    #home {
        background-image: url("../assets/52c1edd6ba4c1.jpg");
        width: 100%;
        height: 100vh;
    }

    .welcome-grids {
        padding: 80px 0;

    }

    .welcome-grid img {
        width: 100%;
    }

    .welcome-grid {
        padding: 0;
    }

    @media (max-width: 991px) {
        .welcome-grid {
            float: left;
            width: 25%;
            padding: 0 6px;
        }

        .info h4 {
            margin-bottom: 8px;
            font-size: 20px;
            padding-top: 53px;
        }
    }

    @media (max-width: 640px) {
        .welcome-grid {
            float: left;
            width: 33.3%;
            padding: 0 7px;
        }

        .welcome-grid:nth-child(5) {
            margin-top: 30px;
        }

        .welcome-grid:nth-child(5) {
            margin-top: 30px;
            width: 100%;
        }

        .welcome-grid:nth-child(5) .ih-item.circle {
            width: 33.3% !important;
        }
    }

    @media (max-width: 480px) {
        .welcome-grid {
            float: left;
            width: 50%;
        }

        .welcome-grid:nth-child(5) {
            width: 50%;
        }

        .welcome-grid:nth-child(5) .ih-item.circle {
            width: 100% !important;
        }

        .welcome-grid:nth-child(5), .welcome-grid:nth-child(4) {
            margin-top: 30px;
        }
    }

    @media (max-width: 320px) {
        .info h4 {
            padding-top: 29px;
        }
    }

    :root {
        --nav-color: #35ce96;
    }

    .navbar-brand {
        position: relative;
        color: #ffffff;
        z-index: 2;
        background-color: var(--nav-color);
    }

    .navbar.navbar-default {
        position: relative;
        z-index: 2;
        background-color: var(--nav-color);
    }

    .navbar-nav.navbar-right .btn {
        position: relative;
        z-index: 2;
        padding: 4px 20px;
        margin: 10px auto;
        background-color: var(--nav-color);
    }

    .navbar .navbar-collapse {
        position: relative;
        background-color: var(--nav-color);
    }

    .navbar .navbar-collapse .navbar-right > li:last-child {
        padding-left: 22px;
        background-color: var(--nav-color);
    }

    .navbar .nav-collapse {
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: 0;
        padding-right: 120px;
        padding-left: 80px;
        width: 100%;
        background-color: var(--nav-color);
    }

    .navbar.navbar-default .nav-collapse {
        background-color: var(--nav-color);
    }

    .navbar.navbar-inverse .nav-collapse {
        background-color: var(--nav-color);
    }

    .navbar .nav-collapse .navbar-form {
        border-width: 0;
        box-shadow: none;
        background-color: var(--nav-color);
    }

    .nav-collapse > li {
        float: right;
        background-color: var(--nav-color);
    }

    .btn.btn-circle {
        border-radius: 20px;
        background-color: var(--nav-color);
    }

    .btn.btn-outline {
        background-color: var(--nav-color);
    }

    @media screen and (max-width: 0px) {
        .navbar .navbar-collapse .navbar-right > li:last-child {
            padding-left: 15px;
            padding-right: 15px;
            background-color: var(--nav-color);
        }

        .navbar .nav-collapse {
            margin: 7.5px auto;
            padding: 0;
            background-color: var(--nav-color);
        }

        .navbar .nav-collapse .navbar-form {
            margin: 0;
            background-color: var(--nav-color);
        }

        .nav-collapse > li {
            float: none;
            background-color: var(--nav-color);
        }
    }

</style>
