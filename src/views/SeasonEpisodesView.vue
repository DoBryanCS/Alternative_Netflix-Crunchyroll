<template>
    <!-- eslint-disable -->
    <!-- filtre -->
    <div id="app" class="container" data-v-app="">
        <div>
            <div>
                <h1 class="title is-1 has-text-centered">{{ episode.tvshowTitle }}</h1>
                <h1 class="title is-1 has-text-centered">{{ episode.seasonNumber }}</h1>
                <div class="container">
                    <div class="columns is-multiline is-mobile">
                        <EpisodesView v-for="e in paginatedData" v-bind:key="e.episodeId" v-bind:s="e" />


                    </div>
                    <div>
                        <nav class="pagination" role="navigation" aria-label="pagination">
                            <!-- page precedent -->
                            <button class="pagination-previous" v-on:click="prevPage" role="button">&lt;</button>
                            <!-- page suivante -->
                            <button class="pagination-next" v-on:click="nextPage" role="button">&gt;</button>
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
            <p style="margin-bottom: 50px">&nbsp;</p>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import { svrURL } from "@/constants";
import EpisodesView from '@/components/EpisodesView.vue';

export default {
    name: "SeasonEpisodesView",
    components: {
        EpisodesView,
    },
    data() {
        return {
            episode: [],
            s: [],
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
            let l = this.s.length,
                s = this.size;
            return Math.ceil(l / s);
        },
        paginatedData() {
            let ep = this.s;

            const start = this.pageNumber * this.size,
                end = start + this.size;
            return ep.slice(start, end);
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
                this.s = this.episode.episodes;
            }
        },
        setPage: function (pageNumber) {
            this.pageNumber = pageNumber;
        },
        nextPage() {
            this.pageNumber++;
            if(this.pageNumber >= this.pageCount){
                this.pageNumber--;
            }
        },
        prevPage() {
            this.pageNumber--;
            if(this.pageNumber <=-1){
                this.pageNumber++;
            }
        },
    },
};
</script>

<style scoped>
h1 {
    text-align: center;
}
</style>
