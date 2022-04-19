<template>
    <div class="column is-2">
        <div class="card">
            <div class="card-image">
                <figure class="image is-3by4">
                    <img v-bind:alt="roles.name" v-bind:src="roles.imgURL">
                </figure>
            </div>
            <div class="card-content">
                <div class="content has-text-centered">
                    <div class="has-text-weight-bold">{{ roles.name }}</div>
                    <div>{{ roles.character }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ActeursView',
    props: {
        roles: Object,
    },
};
</script>

<style scoped>

</style>
