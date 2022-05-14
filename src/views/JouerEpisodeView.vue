<template>
    <!-- eslint-disable -->
    <div class="border" v-if="this.$store.state.token == ''">
       Vous devez etre connecté pour accéder à cette page.
       <br />
       <router-link v-bind:to="{ name: 'login' }" alt="login">
            Se connecter
        </router-link>
    </div>
    <video v-if="this.$store.state.token !== ''" class="center" width="1000" height="1000" controls :src="episodeVideo.videoURL"></video>
</template>

<script>
/* eslint-disable */
import { svrURL } from "@/constants";

export default {
    name: "JouerEpisodeView",
    data() {
        return {
            episodeVideo: [],
        };
    },
    mounted() {
        this.getEpisodeVideo();
    },
    methods: {
        async getEpisodeVideo() {
            const bearerToken = `bearer ${this.$store.state.token}`;
            const rep = await fetch(`${svrURL}/viewepisode?episodeId=${this.$route.params.episodeId}`, {
                    method: "GET",
                    headers: { Authorization: bearerToken },
                });
            if (rep.ok) {
                this.episodeVideo = await rep.json();
            }
        },
    },
};
</script>

<style scoped>
video.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.border {
 border:3px; 
 border-style:solid; 
 border-color:#FF0000; 
 padding: 1em;
 text-align: center;
 font-size: 30px;
 font-weight: bold;
}
</style>