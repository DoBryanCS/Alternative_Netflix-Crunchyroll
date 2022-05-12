import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import SignUpView from '@/views/SignUpView.vue';
import AboutView from '@/views/AboutView.vue';
import DetailsView from '@/views/DetailsView.vue';
import SeasonEpisodesView from '@/views/SeasonEpisodesView.vue';
import DetailsEpisodeView from '@/views/DetailsEpisodeView.vue';
import HistoryView from '@/views/HistoryView.vue';
import ProfileView from '@/views/ProfileView.vue';
import JouerEpisodeView from '@/views/JouerEpisodeView.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView,
    },
    {
        path: '/signup',
        name: 'signup',
        component: SignUpView,
    },
    {
        path: '/about',
        name: 'about',
        component: AboutView,
    },
    {
        path: '/history',
        name: 'history',
        component: HistoryView,
    },
    {
        path: '/profile',
        name: 'profile',
        component: ProfileView,
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
    {
        path: '/jouerEpisode/:episodeId',
        name: 'jouerEpisode',
        component: JouerEpisodeView,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
