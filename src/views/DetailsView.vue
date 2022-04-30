<template>
 <!-- eslint-disable -->
            <div id="app" class="container" v-if="tvshow !== null">
                <div>
                    <div >
                        <div class="columns" >
                            <div class="column is-5" >
                                <img v-bind:alt="tvshow.title" v-bind:src="tvshow.imgURL">
                            </div>
                            <div class="column is-7"  role="details">
                                <div class="columns is-multiline" >
                                    <div class="column is-8" >
                                        <h2 class="title is-2" >{{ tvshow.title }}</h2>
                                    </div>
                                    <div class="column is-4 has-text-right" ><!---->
                                    </div>
                                    <h5 class="column is-12" >{{ tvshow.year }}</h5>
                                    <div class="column is-2" >
                                        <p >{{ tvshow.episodeCount }} épisodes</p>
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
                        <div class="columns is-mobile is-multiline scrolling-wrapper-flexbox">
                            <ActeursView v-for="r in roles" v-bind:key="r.roleId" v-bind:roles="r" />
                        </div>
                        <div class="columns is-mobile is-multiline scrolling-wrapper-flexbox" >
                            <SeasonsView v-for="s in seasons" v-bind:key="s.roleId" v-bind:seasons="s" />
                        </div>
                    </div>
                    <p style="margin-bottom: 50px">&nbsp;</p>
                </div>
            </div>
</template>

<script>
/* eslint-disable object-curly-newline */
import { svrURL } from '@/constants';
import ActeursView from '@/components/ActeursView.vue';
import SeasonsView from '@/components/SeasonsView.vue';
// noinspection JSUnusedGlobalSymbols
export default {
    name: 'DetailsView',
    components: {
        ActeursView,
        SeasonsView,
    },
    data() {
        return {
            tvshow: null,
            roles: [],
            seasons: [],
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
                this.roles = this.tvshow.roles;
                this.seasons = this.tvshow.seasons;
            }
        },
    },
};
</script>

<style scoped>

.scrolling-wrapper-flexbox{
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
}

</style>
