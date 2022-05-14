<template>
    <div>
        <MenuView />
        <router-view />
    </div>
</template>

<script>
/* eslint-disable*/
import MenuView from "@/components/MenuView.vue";


import { svrURL } from "@/constants";

export default {
    name: "App",
    components: { MenuView },
    data() {
        return {
            token: "",
            history: [],
        };
    },
    mounted() {
        // const t = sessionStorage.getItem("token");
        if (sessionStorage.getItem("token")) {
            this.$store.state.token = sessionStorage.getItem("token");
            console.log(this.$store.state.token);
            console.log(sessionStorage.getItem("token"));
        }

        this.getHistory();
    },
    methods: {
        async getHistory() {
            const bearerToken = `bearer ${this.$store.state.token}`;
            const rep = await fetch(`${svrURL}/user/history`, {
                method: "GET",
                headers: { Authorization: bearerToken },
            });
            if (rep.ok) {
                this.history = await rep.json();
                this.$store.state.history = this.history;
                console.log(this.$store.state.history);
            }
        },
    },
    watch: {
        token(newToken) {
            console.log(`setting token: ${newToken}`);
            sessionStorage.setItem("token", newToken);
        },
    },
};
</script>
