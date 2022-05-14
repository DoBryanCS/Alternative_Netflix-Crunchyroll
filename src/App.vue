<template>
    <div>
        <MenuView />
        <router-view />
    </div>
</template>

<script>
/* eslint-disable*/
import MenuView from "@/components/MenuView.vue";

export default {
    name: "App",
    components: { MenuView },
    data() {
        return {
            token: "",
        };
    },
    mounted() {
        // const t = sessionStorage.getItem("token");
        if (sessionStorage.getItem("token")) {
            this.$store.state.token = sessionStorage.getItem("token");
            console.log(this.$store.state.token)
            console.log(sessionStorage.getItem("token"))
             console.log(this.$store.state.history)
        }
        
    },
    watch: {
        token(newToken) {
            console.log(`setting token: ${newToken}`);
            sessionStorage.setItem("token", newToken);
        },
    },
};
</script>
