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
                <router-link v-if="this.$root.$data.token === ''"
                                     class="navbar-item"
                                     v-bind:to="{ name: 'signup' }">
                    Sign up
                </router-link>
                <router-link v-if="this.$root.$data.token === ''"
                                     class="navbar-item"
                                     v-bind:to="{ name: 'login' }">
                    Login
                </router-link>
                <router-link v-if="this.$root.$data.token !== ''"
                                class="navbar-item"
                                v-bind:to="{ name: 'history' }">
                    History
                </router-link>
                <router-link v-if="this.$root.$data.token !== ''"
                                class="navbar-item"
                                v-bind:to="{ name: 'profile' }">
                    Profile
                </router-link>
                <button v-if="this.$root.$data.token !== ''"
                                class="navbar-item button is-danger"
                                v-on:click="logout">
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
    </nav>
</template>

<script>
export default {
    name: 'MenuView',
    methods: {
        logout() {
            this.$root.$data.token = '';
            this.$router.push('/');
        },
    },
};
</script>
