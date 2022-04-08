<template>
<!-- eslint-disable -->
            <div class="section">
                <div class="columns is-centered">
                    <div class="field is-horizontal" style="padding-left: 20px;">
                        <div class="field-label is-normal">
                            <label for="seriesTitle" class="label">Title:</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <p class="control">
                                    <input id="seriesTitle" aria-label="series title" class="input" type="text" placeholder="Name" v-model="filtreTitre">
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="field is-horizontal" style="padding-left: 20px;">
                        <div class="field-label is-normal">
                            <label for="studios" class="label">Studio:</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <div class="control select">
                                    <select id="studios" aria-label="studio" v-model="filtreStudios">
                                        <option></option>
                                        <option
                                            v-for="s in studios"
                                            v-bind:key="s.studioId"
                                            v-bind:value="s.studioId">
                                            {{ s.name }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="panel" >
                    <p class="panel-heading" > Genres </p>
                    <div class="panel-block" >
                        <div class="columns is-mobile is-multiline" >
                            <div class="column is-2" id="genres"
                                        v-for="g in genres"
                                        >
                                        
                                <label class="checkbox label" >
                                    <input type="checkbox" v-model="filtreGenres"
                                                            v-bind:key="g.genreId"
                                                            v-bind:value="g.genreId">
                                    {{ g.name }} 
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="section">
                <div class="row columns is-multiline is-mobile" >
                    <div v-for="t in tvFiltres"
                         v-bind:key="t.tvshowId"
                         class="column is-3-desktop is-4-tablet is-6-mobile">
                            <div class="card has-text-black">
                                <div class="card-image">
                                    <figure class="image is-2by3">
                                        <img v-bind:alt="t.title" v-bind:src="t.imgURL">
                                    </figure>
                                </div>
                                <div class="card-content">
                                    <div class="content has-text-centered">
                                        <p class="title is-3" style="color: black; min-height: 72px;">
                                            {{ t.title }}
                                        </p>
                                        <div class="mb-0">
                                            <span class="has-text-weight-bold">Studio: </span>
                                            <span>{{ t.studio.name }}</span>
                                        </div>
                                        <div class="mb-0">
                                            <span class="has-text-weight-bold">Genres: </span>
                                            <span>{{ t.genres.map((e) => e.name).join(', ') }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
                <div >
                    <nav class="pagination" role="navigation" aria-label="pagination" >
                        <button class="pagination-previous" >&lt;</button>
                        <button class="pagination-next" >&gt;</button>
                        <ul class="pagination-list" >
                            <li >
                                <button class="pagination-link is-current" aria-label="Page 1" >1</button>
                            </li>
                            <li >
                                <button class="pagination-link" aria-label="Page 2" >2</button>
                            </li>
                            <li >
                                <button class="pagination-link" aria-label="Page 3" >3</button>
                            </li>
                            <li >
                                <button class="pagination-link" aria-label="Page 4" >4</button>
                            </li>
                        </ul>
                    </nav>
                </div>
            <p style="margin-bottom: 50px;">&nbsp;</p>
</template>

<script>
/* eslint-disable */
import { svrURL } from '@/constants';
export default {
    name: 'HomeView',
    data() {
        return {
            tv: [],
            genres: [],
            studios: [],
            filtreStudios: '',
            filtreGenres: '',
            filtreTitre: '',

        };
    },
    computed: {
        tvFiltres() {
            let tvFiltres = this.tv;
            if (this.filtreStudios !== '') {
                tvFiltres = tvFiltres.filter(
                    (t) => t.studio.studioId === parseInt(this.filtreStudios, 10),
                );
            }
            if (this.filtreGenres !== '') {
                tvFiltres = tvFiltres.filter(
                    (t) => t.genres.filter(
                        (ty) => ty.genreId === parseInt(this.filtreGenres, 10),
                    ).length > 0,
                );
            }
            if (this.filtreTitre !== '') {
                tvFiltres = tvFiltres.filter(
                    (t) => t.title.toLowerCase().includes(this.filtreTitre.toLowerCase())
                );
            }
            return tvFiltres;
        },

    },
    mounted() {
        this.getTv();
        this.getGenres();
        this.getStudios();
        console.log(this.tv)
    },
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
    }
};
</script>

<style scoped>
h1 {
    text-align: center;
}
</style>
