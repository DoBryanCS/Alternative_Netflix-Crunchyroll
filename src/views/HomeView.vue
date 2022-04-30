<template>
    <!-- eslint-disable -->
    <!-- filtre -->
    <div class="section">
        <div class="columns is-centered" role="filtre">
            <div class="field is-horizontal" style="padding-left: 20px">
                <div class="field-label is-normal">
                    <label for="seriesTitle" class="label" alt="title">Title:</label>
                </div>
                <div class="field-body">
                    <div class="field">
                        <p class="control">
                            <input id="seriesTitle" aria-label="series title" class="input" type="text" placeholder="Name" v-model="filtreTitre" />
                        </p>
                    </div>
                </div>
            </div>
            <div class="field is-horizontal" style="padding-left: 20px">
                <div class="field-label is-normal">
                    <label for="studios" class="label" alt="studio">Studio:</label>
                </div>
                <div class="field-body">
                    <div class="field">
                        <div class="control select">
                            <select id="studios" aria-label="studio" v-model="filtreStudios">
                                <option></option>
                                <option v-for="s in studios" v-bind:key="s.studioId" v-bind:value="s.studioId">
                                    {{ s.name }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="panel">
            <p class="panel-heading">Genres</p>
            <div class="panel-block">
                <div class="columns is-multiline is-mobile">
                    <div v-for="g in genres" v-bind:key="g.genreId" class="column is-2">
                        <label class="checkbox" role="checkbox">
                            <input type="checkbox" name="genre" v-model="filtreGenres" v-bind:value="g.genreId" />
                            {{ g.name }}
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- filtre -->
    <!-- liste -->
    <div class="section" role="liste">
        <div class="row columns is-multiline is-mobile">
            <!-- affiche la liste des items -->
            <TvshowsView v-for="t in paginatedData" v-bind:key="t.tvshowId" v-bind:tvshow="t" />
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
import TvshowsView from "@/components/TvshowsView.vue";
export default {
    name: "HomeView",
    components: { TvshowsView },
    data() {
        return {
            tv: [],
            genres: [],
            studios: [],
            filtreStudios: "",
            filtreGenres: [],
            filtreTitre: "",
            //index par default du numer0 de page
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
        //sert a definir le nombre de button pour la pagination
        pageCount() {
            let l = this.tv.length,
                s = this.size;
            return Math.ceil(l / s);
        },
        paginatedData() {
            let tvFiltres = this.tv;
            if (this.filtreStudios !== "") {
                tvFiltres = tvFiltres.filter((t) => t.studio.studioId === parseInt(this.filtreStudios, 10));
            }
            if (this.filtreGenres !== 0) {
                tvFiltres = tvFiltres.filter((t) => this.filtreGenres.every((genre) => t.genres.some((g) => g.genreId === genre)));
            }
            if (this.filtreTitre !== "") {
                tvFiltres = tvFiltres.filter((t) => t.title.toLowerCase().includes(this.filtreTitre.toLowerCase()));
            }

            //sert a delimiter le premier et le dernier item de la page courante
            const start = this.pageNumber * this.size,
                end = start + this.size;
            return tvFiltres.slice(start, end);
        },
    },
    // la fonction mounted sera exécutée au chargement de la vue
    mounted() {
        this.getTv();
        this.getGenres();
        this.getStudios();
    },
    // methods contient les méthodes (fonctions) propres à la vue
    methods: {
        async getTv() {
            const rep = await fetch(`${svrURL}/tvshows`);
            if (rep.ok) {
                this.tv = await rep.json();
            }
        },
        async getGenres() {
            const rep = await fetch(`${svrURL}/genres`);
            if (rep.ok) {
                this.genres = await rep.json();
            }
        },
        async getStudios() {
            const rep = await fetch(`${svrURL}/studios`);
            if (rep.ok) {
                this.studios = await rep.json();
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
