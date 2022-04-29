<template>
<!-- eslint-disable -->
    <div class="section" role="form">
        <h1 class="title is-1 has-text-centered">Login</h1>
        <!---->
        <div class="field">
            <label class="label" for="username">Username
            </label>
            <div class="control has-icons-left">
                <input id="username"
                    v-model="username"
                    autocomplete="username"
                    class="input"
                    placeholder="e1234567"
                    required>
                <span class="icon is-small is-left">
                    <i class="fa fa-envelope"></i>
                </span>
            </div>
            <div id="login-error-msg" v-for="(error, index) in errorsUsername" :key="index">{{ error }}</div>
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
            <div id="login-error-msg" v-for="(error, index) in errorsPassword" :key="index">{{ error }}</div>
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
/* eslint-disable */
import { svrURL } from '@/constants';

export default {
    name: 'LoginView',
    data() {
        return {
            username: '',
            password: '',
            errorsUsername:[],
            errorsPassword:[],
        };
    },
    methods: {
        annuler() {
            this.$router.push('/');
        },
        async obtenirJeton() {
            this.errorsUsername = [];
            this.errorsPassword = [];
            if (this.username == "") {
                this.errorsUsername.push("Le username est obligatoire");
            }
            if (this.password == "") {
                this.errorsPassword.push("Le mot de passe est obligatoire");
            }
            else {
                const bodyContent = JSON.stringify({
                    username: this.username,
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
                    this.$router.push('/');
                } else {
                    this.$root.$data.token = '';
                }
            }
        },
    },
};
</script>

<style scoped>
#login-error-msg {
  width: 23%;
  text-align: center;
  margin: 0;
  padding: 5px;
  font-size: 12px;
  font-weight: bold;
  color: #8a0000;
  border: 1px solid #8a0000;
  background-color: #e58f8f;
  opacity: 1;
}
</style>
