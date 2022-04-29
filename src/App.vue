<template>
    <div>
        <MenuView/>
        <router-view/>
    </div>
</template>

<script>

import MenuView from '@/components/MenuView.vue';

export default {
    name: 'App',
    components: { MenuView },
    data() {
        return {
            token: '',
        };
    },
    mounted() {
        const t = sessionStorage.getItem('token');
        if (t) {
            this.token = t;
        }
    },
    watch: {
        token(newToken) {
            console.log(`setting token: ${newToken}`);
            sessionStorage.setItem('token', newToken);
        },
    },
};
</script>
