<template>
 <!-- eslint-disable -->
            <div id="app" class="container" v-if="tvshow !== null">
                <div>
                    <div >
                        <div class="columns" >
                            <div class="column is-5" >
                                <img v-bind:alt="tvshow.title" v-bind:src="tvshow.imgURL">
                            </div>
                            <div class="column is-7" >
                                <div class="columns is-multiline" >
                                    <div class="column is-8" >
                                        <h2 class="title is-2" >{{ tvshow.title }}</h2>
                                    </div>
                                    <div class="column is-4 has-text-right" ><!---->
                                    </div>
                                    <h5 class="column is-12" >{{ tvshow.year }}</h5>
                                    <div class="column is-2" >
                                        <p >{{ tvshow.episodeCount }}</p>
                                    </div>
                                    <div class="column is-2" >
                                        <p >{{ tvshow.tvParentalGuideline }}</p>
                                    </div>
                                    <div class="column is-8" >
                                        <p class="has-text-right" >{{ tvshow.genres.map((e) => e.name).join(', ') }}</p>
                                    </div>
                                    <div class="column is-2" >
                                        <p >Studio</p>
                                    </div>
                                    <div class="column is-10" >
                                        <p >{{ tvshow.studio.name }}</p>
                                    </div>
                                    <div class="column is-12 has-text-justified" >
                                        <p >{{ tvshow.plot }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="columns is-mobile is-multiline scrolling-wrapper-flexbox" >
                            <div class="column is-2" v-for="r in tvshow.roles">
                                <div class="card">
                                    <div class="card-image">
                                        <figure class="image is-3by4">
                                            <img v-bind:src="r.imgURL">
                                        </figure>
                                    </div>
                                    <div class="card-content">
                                        <div class="content has-text-centered">
                                            <div class="has-text-weight-bold">{{ r.name }}</div>
                                            <div>{{ r.character }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="columns is-mobile is-multiline scrolling-wrapper-flexbox" >
                            <div class="column is-3" v-for="s in tvshow.seasons">
                                <router-link
                                    v-bind:to="{ name: 'episodes',
                                        params: { seasonId: parseInt(s.seasonId) }}">
                                    <div class="card">
                                        <div class="card-image">
                                            <figure class="image is-3by4">
                                                <img v-bind:alt="s.seasonId" v-bind:src="s.imgURL">
                                            </figure>
                                        </div>
                                        <div class="card-content">
                                            <div class="content has-text-centered">
                                                <h4 class="title is-4"> Season {{ s.number }}</h4>
                                                <div>{{ s.count }}</div>
                                            </div>
                                        </div>
                                    </div>
                                </router-link>
                            </div>
                        </div>
                    </div>
                   
                </div>
            </div>
</template>

<script>
/* eslint-disable object-curly-newline */
import { svrURL } from '@/constants';

// noinspection JSUnusedGlobalSymbols
export default {
    name: 'DetailsView',
    data() {
        return {
            tvshow: null,
        };
    },
    mounted() {
        this.gettvshow();
    },
    methods: {
        async gettvshow() {
            console.log('gettvshow');
            console.log(this.$route.params.tvshowId);
            const rep = await fetch(`${svrURL}/tvshow?tvshowId=${this.$route.params.tvshowId}`);
            if (rep.ok) {
                this.tvshow = await rep.json();
            }
        },
    },
};
</script>

<style scoped>
</style>
