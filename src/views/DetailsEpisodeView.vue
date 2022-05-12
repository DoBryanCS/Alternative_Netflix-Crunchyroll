<template>
 <!-- eslint-disable -->
    <div id="app" class="container"  v-if="detailsEpisode !== null">
        <div>
            <div class="block"  role="details">
                <h1 class="title is-3 has-text-centered" >{{ detailsEpisode.tvshowTitle }}</h1>
                <h3 class="title is-3 has-text-centered" >{{ detailsEpisode.seasonNumber }}
                    <span > - </span>
                    <span >{{ detailsEpisode.number }}</span>
                    <span > - </span>
                    <span >{{ detailsEpisode.title }}</span>
                </h3>
                <p >{{ detailsEpisode.runtime }} mins</p>
                <p >{{ detailsEpisode.tvParentalGuideline }}</p>
                <p class="has-text-justified" >
                    {{ detailsEpisode.plot }}
                </p>
                <router-link
                v-bind:to="{ name: 'jouerEpisode',
                        params: { episodeId: parseInt(detailsEpisode.episodeId) }}">
                    <div class="has-text-centered"  style="padding-top: 50px;">
                        <img v-bind:alt="detailsEpisode.title" v-bind:src="detailsEpisode.imgURL"  style="position: relative;">
                        <img id="somelement" alt="play" src="../../public/images/play.9fcb8068.png">
                    </div>
                </router-link>
            </div>
            <p style="margin-bottom: 50px;">&nbsp;</p>
        </div>
    </div>
</template>

<script>
/* eslint-disable object-curly-newline */
import { svrURL } from '@/constants';

// noinspection JSUnusedGlobalSymbols
export default {
    name: 'DetailsEpisodeView',
    data() {
        return {
            detailsEpisode: null,
        };
    },
    mounted() {
        this.getEpisodeDetails();
    },
    methods: {
        async getEpisodeDetails() {
            const rep = await fetch(`${svrURL}/episode?episodeId=${this.$route.params.episodeId}`);
            if (rep.ok) {
                this.detailsEpisode = await rep.json();
            }
        },
    },
};
</script>

<style scoped>
#somelement{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}
</style>
