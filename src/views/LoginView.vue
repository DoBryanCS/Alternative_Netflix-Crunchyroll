<template>
    <div class="section" role="form">
        <h1 class="title is-1 has-text-centered">Login</h1>
        <!---->
        <div class="field">
            <label class="label" for="email">Username
            </label>
            <div class="control has-icons-left">
                <input id="email"
                    v-model="email"
                    autocomplete="username"
                    class="input"
                    placeholder="e1234567"
                    required>
                <span class="icon is-small is-left">
                    <i class="fa fa-envelope"></i>
                </span>
            </div>
        </div>
        <div class="field">
            <label class="label" for="password">Mot de passe</label>
            <div class="control has-icons-left">
                <input id="password"
                    v-model="password"
                    autocomplete="password"
                    class="input"
                    placeholder="*******"
                    type="password"
                    required>
                <span class="icon is-small is-left">
                    <i class="fa fa-lock"></i>
                </span>
            </div>
        </div>
        <div class="field">
            <div class="control">
                <button class="button is-success"
                        v-on:click.prevent="obtenirJeton">
                    Connexion
                </button>
                <button class="button is-danger"
                        v-on:click="annuler">
                    Annuler
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { svrURL } from '@/constants';

export default {
    name: 'LoginView',
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        annuler() {
            this.$router.push('/');
        },
        async obtenirJeton() {
            const bodyContent = JSON.stringify({
                email: this.email,
                password: this.password,
            });
            const response = await fetch(`${svrURL}/auth/token`, {
                method: 'POST',
                body: bodyContent,
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                const data = await response.json();
                this.$root.$data.token = data.token;
                this.$router.push('/favorites');
            } else {
                this.$root.$data.token = '';
            }
        },
    },
};
</script>

<style scoped>

</style>
