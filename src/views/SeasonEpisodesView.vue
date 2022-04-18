<template>
    <!-- eslint-disable -->
    <!-- filtre -->
        <div id="app" class="container" data-v-app="">
            <div>
                <div >
                    <h1 class="title is-1 has-text-centered" >{{ episode.tvshowTitle }}</h1>
                    <h1 class="title is-1 has-text-centered" >{{ episode.seasonNumber }}</h1>
                    <div class="container">
                        <div class="columns is-multiline is-mobile">
                            <div class="column is-3-desktop is-4-tablet is-12-mobile" v-for="e in episode.episodes">
                                <router-link
                                    v-bind:to="{ name: 'detailsEpisode',
                                        params: { episodeId: parseInt(e.episodeId) }}">
                                    <div class="card">
                                        <div class="card-image">
                                            <figure class="image is-16by9">
                                                <img v-bind:alt="e.title" v-bind:src="e.imgURL">
                                            </figure>
                                        </div>
                                        <div class="card-content">
                                            <div class="content has-text-centered">
                                                <h4 class="title is-4 mb-0">{{ e.title }}</h4>
                                                <div>{{ e.number }}</div>
                                            </div>
                                        </div>
                                    </div>
                                </router-link>
                            </div>
                        </div>
                        <div>
                            <nav class="pagination" role="navigation" aria-label="pagination">
                                <!-- page precedent -->
                                <button class="pagination-previous" v-on:click="prevPage">&lt;</button>
                                <!-- page suivante -->
                                <button class="pagination-next" v-on:click="nextPage">&gt;</button>
                                <ul class="pagination-list">
                                    <!-- affiche le nombre approprier de page de navigation -->
                                    <li v-for="p in pageCount">
                                        <button class="pagination-link" @click="setPage(p - 1)" aria-label="page ">{{ p }}</button>
                                    </li>
                                    <!-- affiche le nombre approprier de page de navigation -->
                                </ul>
                            </nav>
                        </div>
                        <!-- pagination -->
                        <p style="margin-bottom: 50px">&nbsp;</p>
                    </div>
                </div>
                <p style="margin-bottom: 50px;">&nbsp;</p>
            </div>
        </div>
</template>

<script>
/* eslint-disable */
import { svrURL } from "@/constants";

export default {
    name: "SeasonEpisodesView",
    
    data() {
        return {
            episode: [],
            pageNumber: 0,
        };
    },
    //sert a determiner combien d'item sera afficher sur la page
    props: {
        size: {
            type: Number,
            required: false,
            default: 8,
        },
    },
    computed: {
        pageCount() {
            let l = this.episode.length,
                s = this.size;
            return Math.ceil(l / s);
        },
        paginatedData() {
            const start = this.pageNumber * this.size,
                end = start + this.size;
            return this.episode.slice(start, end);
        },
    },
    // la fonction mounted sera exécutée au chargement de la vue
    mounted() {
        this.getEpisode();
    },
    // methods contient les méthodes (fonctions) propres à la vue
    methods: {
        async getEpisode() {
            const rep = await fetch(`${svrURL}/episodes?seasonId=${this.$route.params.seasonId}`);
            if (rep.ok) {
                this.episode = await rep.json();
            }
        },
        setPage: function (pageNumber) {
            this.pageNumber = pageNumber;
        },
        nextPage() {
            this.pageNumber++;
        },
        prevPage() {
            this.pageNumber--;
        },
    },
};
</script>

<style scoped>
h1 {
    text-align: center;
}
</style>
