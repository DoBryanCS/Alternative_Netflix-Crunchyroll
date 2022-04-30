<template>
    <!-- eslint-disable -->
    <div class="section" role="form">
        <h1 class="title is-1 has-text-centered">Profile</h1>
        <div class="field">
            <label class="label" for="email">Email </label>
            <div class="control has-icons-left">
                <input type="email" v-model="email" class="input" placeholder="e1234567@site.com" required />
                <span class="icon is-small is-left">
                    <i class="fa fa-envelope"></i>
                </span>
            </div>
            <div id="login-error-msg" v-for="(error, index) in errorsEmail" :key="index">{{ error }}</div>
        </div>
        <div class="field">
            <label class="label" for="username">Username </label>
            <div class="control has-icons-left">
                <input id="username" v-model="username" class="input" placeholder="e1234567" required />
                <span class="icon is-small is-left">
                    <i class="fa fa-envelope"></i>
                </span>
            </div>
            <div id="login-error-msg" v-for="(error, index) in errorsUsername" :key="index">{{ error }}</div>
        </div>
        <div ref="suppPersonneModal" class="modal">
                <div class="modal-background"></div>
                <div class="modal-content">
                    <div class="notification is-danger">
                        <p>Voulez-vous vraiment supprimer l'utilisateur ? <strong>La personne sera définitivement supprimée!</strong></p>
                        <br />
                        <div class="buttons is-flex is-justify-content-center">
                            <button @click="supprimerOui" class="button is-danger is-light">Oui</button>
                            <button @click="supprimerNon" class="button is-success is-light">Non</button>
                        </div>
                    </div>
                </div>
        </div>
        <div class="field">
            <label class="label" for="password">Mot de passe</label>
            <div class="control has-icons-left">
                <input id="password" v-model="password" class="input" placeholder="*******" type="password" required />
                <span class="icon is-small is-left">
                    <i class="fa fa-lock"></i>
                </span>
            </div>
            <div id="login-error-msg" v-for="(error, index) in errorsPassword" :key="index">{{ error }}</div>
        </div>
        <div class="field">
            <label class="label" for="confirm">Confirmer mot de passe</label>
            <div class="control has-icons-left">
                <input id="confirm" v-model="confirm" class="input" placeholder="*******" type="password" required />
                <span class="icon is-small is-left">
                    <i class="fa fa-lock"></i>
                </span>
            </div>
            <div id="login-error-msg" v-for="(error, index) in errorsConfirmPassword" :key="index">{{ error }}</div>
        </div>
        <div class="field">
            <div class="control">
                <button class="button is-success" v-on:click="Update">Update</button>
                <button class="button is-danger" v-on:click="annuler">Annuler</button>
            </div>
        </div>
        <div class="field">
            <div class="control">
                <button class="button is-danger" v-on:click="supprimer">Delete Profile</button>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import { svrURL } from "@/constants";

export default {
    name: "ProfileView",
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
    mounted() {
        this.getUserInfos();
    },
    methods: {
        async annuler() {
                await this.getUserInfos();
                this.password =null;
                this.confirm = null;
        },
        async getUserInfos() {
                const bearerToken = `bearer ${this.$root.$data.token}`;
                const response = await fetch(`${svrURL}/user`, {
                    method: "GET",
                    headers: { Authorization: bearerToken },
                });
                if (response.ok) {
                    const data = await response.json();
                    this.email = data.email
                    this.username = data.username
                }
        },
        async Update() {
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
                const bearerToken = `bearer ${this.$root.$data.token}`;
                const response = await fetch(`${svrURL}/user`, {
                    method: "POST",
                    body: bodyContent,
                    headers: { "Content-Type": "application/json", Authorization: bearerToken },
                });
                if (response.ok) {
                    this.$router.push("/");
                }
            }
        },
        supprimer() {
            this.$refs.suppPersonneModal.classList.add('is-active');
        },
        async supprimerOui() {
            const bearerToken = `bearer ${this.$root.$data.token}`;
            const res = await fetch(`${svrURL}/user`, {
                method: 'DELETE',
                headers: { Authorization: bearerToken },
            });
            if (res.ok) {
                this.$refs.suppPersonneModal.classList.remove('is-active');
                this.$root.$data.token = '';
                this.$router.push('/');

            } else {
                console.error(res.statusText);
            }
        },
        supprimerNon() {
            this.$refs.suppPersonneModal.classList.remove('is-active');
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


