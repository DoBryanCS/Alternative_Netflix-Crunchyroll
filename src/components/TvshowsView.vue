<template>
    <div class="column is-3-desktop is-4-tablet is-6-mobile">
        <router-link
                v-bind:to="{ name: 'details',
                        params: { tvshowId: parseInt(tvshow.tvshowId) }}">
            <div class="card has-text-black">
                <div class="card-image">
                    <figure class="image is-2by3">
                        <img v-bind:alt="tvshow.title" v-bind:src="tvshow.imgURL">
                    </figure>
                </div>
                <div class="card-content">
                    <div class="content has-text-centered">
                        <p class="title is-3" style="color: black; min-height: 72px;">
                            {{ tvshow.title }}
                        </p>
                        <div class="mb-0">
                            <span class="has-text-weight-bold">Studio: </span>
                            <span>{{ tvshow.studio.name }}</span>
                        </div>
                        <div class="mb-0">
                            <span class="has-text-weight-bold">Genres: </span>
                            <span>{{ tvshow.genres.map((e) => e.name).join(', ') }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'TvshowsView',
    props: {
        tvshow: Object,
    },
};
</script>

<style scoped>

</style>
