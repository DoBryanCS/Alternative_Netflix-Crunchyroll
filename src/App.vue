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
        const t = sessionStorage.getItem("token");
        if (t) {
            this.$store.state.token = t;
            console.log(this.$store.state.token)
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
