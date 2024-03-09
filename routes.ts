import { Router } from './routes/router';

export const router = new Router({
    Home: '/',
    Search: '/search',
    Settings: '/settings',
    PostThread: '/profile/:name/post/:rkey',
    Profile: '/profile/:name',
});