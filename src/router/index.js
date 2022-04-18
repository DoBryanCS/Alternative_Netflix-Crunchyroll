import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import DetailsView from '@/views/DetailsView.vue';
import SeasonEpisodesView from '@/views/SeasonEpisodesView.vue';
import DetailsEpisodeView from '@/views/DetailsEpisodeView.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
    },
    {
        path: '/details/:tvshowId',
        name: 'details',
        component: DetailsView,
    },
    {
        path: '/episodes/:seasonId',
        name: 'episodes',
        component: SeasonEpisodesView,
    },
    {
        path: '/episode/:episodeId',
        name: 'detailsEpisode',
        component: DetailsEpisodeView,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
