<template>
<!-- eslint-disable -->
    <div class="column is-3-desktop is-4-tablet is-12-mobile">
        <router-link v-bind:to="{ name: 'detailsEpisode', params: { episodeId: parseInt(s.episodeId) } }">
            <div class="card">
                <div class="card-image">
                    <figure class="image is-16by9">
                        <img v-bind:alt="s.title" v-bind:src="s.imgURL" />
                    </figure>
                </div>
                <div class="card-content">
                    <div class="content has-text-centered">
                        <h4 class="title is-4 mb-0">{{ s.title }}</h4>
                        <div>{{ s.number }}</div>
                    </div>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'EpisodesView',
    props: {
        s: Object,
    },
};
</script>

<style scoped>

</style>
