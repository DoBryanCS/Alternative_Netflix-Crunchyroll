<template>
    <!-- eslint-disable -->
    <div class="section" role="form">
        <h1 class="title is-1 has-text-centered">Sign Up</h1>

        <div class="field">
            <label class="label" for="email">Email </label>
            <div class="control has-icons-left">
                <input id="email" v-model="email" class="input" placeholder="e1234567@site.com" required />
                <span class="icon is-small is-left">
                    <i class="fa fa-envelope"></i>
                </span>
            </div>
        </div>
        <div class="field">
            <label class="label" for="username">Username </label>
            <div class="control has-icons-left">
                <input id="username" v-model="username" class="input" placeholder="e1234567" required />
                <span class="icon is-small is-left">
                    <i class="fa fa-envelope"></i>
                </span>
            </div>
            <div>{{ errors.username }}</div>
        </div>
        <div class="field">
            <label class="label" for="password">Mot de passe</label>
            <div class="control has-icons-left">
                <input id="password" v-model="password" class="input" placeholder="*******" type="password" required />
                <span class="icon is-small is-left">
                    <i class="fa fa-lock"></i>
                </span>
            </div>
        </div>
        <div class="field">
            <label class="label" for="confirm">Confirmer mot de passe</label>
            <div class="control has-icons-left">
                <input id="confirm" v-model="confirm" class="input" placeholder="*******" type="password" required />
                <span class="icon is-small is-left">
                    <i class="fa fa-lock"></i>
                </span>
            </div>
        </div>
        <div class="field">
            <div class="control">
                <button class="button is-success" v-on:click.prevent="obtenirJeton">Sign Up</button>
                <button class="button is-danger" v-on:click="annuler">Annuler</button>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import { svrURL } from "@/constants";

export default {
    name: "SignUpView",
    data() {
        return {
            email: "",
            username: "",
            password: "",
            confirm: "",
            errors: {},
        };
    },
    methods: {
        annuler() {
            this.$router.push("/");
        },

        async obtenirJeton() {
            const bodyContent = JSON.stringify({
                email: this.email,
                password: this.password,
            });
            const response = await fetch(`${svrURL}/auth/token`, {
                method: "POST",
                body: bodyContent,
                headers: { "Content-Type": "application/json" },
            });
            if (response.ok) {
                const data = await response.json();
                this.$root.$data.token = data.token;
                this.$router.push("/favorites");
            } else {
                this.$root.$data.token = "";
            }
        },
    },
};
</script>

<style scoped></style>
