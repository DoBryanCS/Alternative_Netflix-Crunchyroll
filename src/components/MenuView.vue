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
                <a href="/signup" class="navbar-item"> Sign Up </a>
                <router-link v-if="this.$root.$data.token === ''"
                                     class="navbar-item"
                                     v-bind:to="{ name: 'login' }">
                    Login
                </router-link>
                <button v-if="this.$root.$data.token !== ''"
                                class="navbar-item button is-danger"
                                v-on:click="logout">
                    Logout
                </button>
                <!---->
                <!---->
                <!---->
                <a href="/about" class="navbar-item"> About </a>
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
