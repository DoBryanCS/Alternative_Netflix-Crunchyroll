<template>
    <div class="column is-3">
        <router-link
            v-bind:to="{ name: 'episodes',
                params: { seasonId: parseInt(seasons.seasonId) }}">
            <div class="card">
                <div class="card-image">
                    <figure class="image is-3by4">
                        <img v-bind:alt="seasons.seasonId" v-bind:src="seasons.imgURL">
                    </figure>
                </div>
                <div class="card-content">
                    <div class="content has-text-centered">
                        <h4 class="title is-4"> Season {{ seasons.number }}</h4>
                        <div>{{ seasons.count }}</div>
                    </div>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'SeasonsView',
    props: {
        seasons: Object,
    },
};
</script>

<style scoped>

</style>
