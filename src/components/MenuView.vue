<template>
    <nav class="navbar is-link">
        <div class="navbar-brand">
            <button class="navbar-burger" data-target="navMenu">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
        <div id="navMenu" class="navbar-menu">
            <div class="navbar-start">
                <router-link class="navbar-item"
                             v-bind:to="{ name: 'home' }">
                    TP2
                </router-link>
            </div>
            <div class="navbar-end">
                <router-link v-if="this.$store.state.token === ''"
                                     class="navbar-item"
                                     v-bind:to="{ name: 'signup' }" alt="sign up">
                    Sign up
                </router-link>
                <router-link v-if="this.$store.state.token === ''"
                                     class="navbar-item"
                                     v-bind:to="{ name: 'login' }" alt="login">
                    Login
                </router-link>
                <router-link v-if="this.$store.state.token !== ''"
                                class="navbar-item"
                                v-bind:to="{ name: 'history' }" alt="history">
                    History
                </router-link>
                <router-link v-if="this.$store.state.token !== ''"
                                class="navbar-item"
                                v-bind:to="{ name: 'profile' }" alt="profil">
                    Profile
                </router-link>
                <button v-if="this.$store.state.token !== ''"
                                class="navbar-item button is-danger"
                                v-on:click="logout" alt="log out" aria-describedby="logOut">
                    Logout
                </button>
                <!---->
                <!---->
                <!---->
                <router-link
                                class="navbar-item"
                                v-bind:to="{ name: 'about' }">
                    About
                </router-link>
            </div>
        </div>
        <span id="logOut" hidden>se deconnecter du compte utilisateur</span>
    </nav>
</template>

<script>
export default {
    name: 'MenuView',
    methods: {
        logout() {
            sessionStorage.setItem('token', '');
            this.$store.state.token = '';
            this.$router.push('/');
        },
    },
};
</script>
