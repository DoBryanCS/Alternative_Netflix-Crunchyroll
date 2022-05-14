<template>
<!-- eslint-disable -->
    <div class="section">
        <h1 class="title is-1 has-text-centered">History</h1>
    </div>
    <div class="section" role="liste">
        <div class="row columns is-multiline is-mobile">
            <!-- affiche la liste des items -->
            <div v-for="t in paginatedData" v-bind:key="t.tvshowId" class="column is-4-desktop is-3-tablet is-1-mobile">
                <div class="card has-text-black">
                    <router-link v-bind:to="{ name: 'detailsEpisode', params: { episodeId: parseInt(t.episodeId) } }">
                    <div class="card-image">
                        <figure>
                            <img v-bind:alt="t.tvshowTitle" v-bind:src="t.imgURL">
                        </figure>
                    </div>
                    </router-link>
                    <div class="card-content">
                        <div class="content has-text-centered">
                            <span class="has-text-weight-bold" style="color: black; min-height: 24px;">
                                <router-link v-bind:to="{ name: 'details', params: { tvshowId: parseInt(t.tvshowId) }}">
                                {{ t.tvshowTitle }}
                                </router-link>
                            </span>
                            <div class="mb-0">
                                <span class="has-text-weight-bold" style="color: black;">
                                <router-link v-bind:to="{ name: 'episodes', params: { seasonId: parseInt(t.seasonId) }}">
                                Season {{ t.seasonNumber }}
                                </router-link>
                                </span>
                            </div>
                            <div class="mb-0">
                                <span class="has-text-weight-bold">
                                <router-link v-bind:to="{ name: 'detailsEpisode', params: { episodeId: parseInt(t.episodeId) } }">
                                {{ t.episodeTitle }}
                                </router-link>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- liste -->
    <!-- pagination -->
    <div role="pagination">
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
</template>

<script>
/* eslint-disable */
import { svrURL } from "@/constants";
export default {
    name: "HistoryView",
    data() {
        return {
            history: [],
            //index par default du numer0 de page
            pageNumber: 0,
        };
    },
    //sert a determiner combien d'item sera afficher sur la page
    props: {
        size: {
            type: Number,
            required: false,
            default: 6,
        },
    },
    computed: {
        //sert a definir le nombre de button pour la pagination
        pageCount() {
            let l = this.history.length,
                s = this.size;
            return Math.ceil(l / s);
        },
        paginatedData() {
            let historyFiltres = this.history;
            //sert a delimiter le premier et le dernier item de la page courante
            const start = this.pageNumber * this.size,
                end = start + this.size;
            return historyFiltres.slice(start, end);
        },
    },
    // la fonction mounted sera exécutée au chargement de la vue
    mounted() {
        this.getHistory();
    },
    // methods contient les méthodes (fonctions) propres à la vue
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