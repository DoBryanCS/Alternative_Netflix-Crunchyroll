<template>
    <!-- eslint-disable -->
    <div class="section" role="form">
        <h1 class="title is-1 has-text-centered">Sign Up</h1>
        <div class="field" role="email input">
            <label class="label" for="email">Email </label>
            <div class="control has-icons-left">
                <input type="email" v-model="email" class="input" placeholder="e1234567@site.com" alt="email" required aria-required="true"/>
                <span class="icon is-small is-left">
                    <i class="fa fa-envelope"></i>
                </span>
            </div>
            <div id="login-error-msg" v-for="(error, index) in errorsEmail" :key="index">{{ error }}</div>
        </div>
        <div class="field" role="username input">
            <label class="label" for="username">Username </label>
            <div class="control has-icons-left">
                <input id="username" v-model="username" class="input" placeholder="e1234567" alt="username" required aria-required="true"/>
                <span class="icon is-small is-left">
                    <i class="fa fa-envelope"></i>
                </span>
            </div>
            <div id="login-error-msg" v-for="(error, index) in errorsUsername" :key="index">{{ error }}</div>
        </div>
        <div class="field" role="password input">
            <label class="label" for="password">Mot de passe</label>
            <div class="control has-icons-left">
                <input id="password" v-model="password" class="input" placeholder="*******" type="password" alt="password" required  aria-required="true"/>
                <span class="icon is-small is-left">
                    <i class="fa fa-lock"></i>
                </span>
            </div>
            <div id="login-error-msg" v-for="(error, index) in errorsPassword" :key="index">{{ error }}</div>
        </div>
        <div class="field" role="confirmation input">
            <label class="label" for="confirm">Confirmer mot de passe</label>
            <div class="control has-icons-left">
                <input id="confirm" v-model="confirm" class="input" placeholder="*******" type="password" alt="password confirmation" required aria-required="true"/>
                <span class="icon is-small is-left">
                    <i class="fa fa-lock"></i>
                </span>
            </div>
            <div id="login-error-msg" v-for="(error, index) in errorsConfirmPassword" :key="index">{{ error }}</div>
        </div>
        <div class="field">
            <div class="control">
                <button class="button is-success" v-on:click="Inscrire" role="button">Sign Up</button>
                <button class="button is-danger" v-on:click="annuler" role="button">Annuler</button>
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
            errorsEmail:[],
            errorsUsername:[],
            errorsPassword:[],
            errorsConfirmPassword:[],
        };
    },
    methods: {
        annuler() {
            this.$router.push("/");
        },

        async Inscrire() {
            this.errorsUsername = [];
            this.errorsEmail = [];
            this.errorsPassword = [];
            this.errorsConfirmPassword = [];
            if (this.username == "") {
                this.errorsUsername.push("Le username est obligatoire");
            }
            else if (!this.username.match(/^([A-Za-z][A-Za-z0-9_]{4,19})$/)) {
                this.errorsUsername.push("Le username doit contenir entre 5 et 20 caractères et doit être composés de lettres majuscules, minuscule, de chiffre et/ou du caractère souligné (_)");
            }
            if (this.email == "") {
                this.errorsEmail.push("L'email est obligatoire");
            }
            else if (!this.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                this.errorsEmail.push("L'email doit suivre la forme suivante: 'anystring@anystring.anystring'");
            }
            if (this.password == "") {
                this.errorsPassword.push("Le mot de passe est obligatoire");
            }
            else if (this.password.length < 6 || this.password.length > 30) {
                this.errorsPassword.push("Le mot de passe doit contenir entre 6 et 30 caractères.");
            }
            if (this.confirm == "") {
                this.errorsConfirmPassword.push("La confirmation du mot de passe est obligatoire");
            }
            else if (this.confirm != this.password){
                this.errorsConfirmPassword.push("Le mot de passe de confirmation doit être identique au mot de passe.");
            }
            else {
                const bodyContent = JSON.stringify({
                    email: this.email,
                    username: this.username,
                    password: this.password,
                });
                console.log(bodyContent)
                const response = await fetch(`${svrURL}/auth/register/`, {
                    method: "POST",
                    body: bodyContent,
                    headers: { "Content-Type": "application/json" },
                });
                if (response.ok) {
                    const data = await response.json();
                    this.$store.state.username = this.username;
                    console.log(this.$store.state.username)
                    this.$router.push("/login");
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





