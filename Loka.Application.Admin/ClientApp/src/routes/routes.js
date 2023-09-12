import config from '~/config';


// Layouts

// Pages
import Login from '~/pages/Login';
import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import Post from '~/pages/Post';
import Room from '~/pages/Room';

// Public routes
const publicRoutes = [
];

const privateRoutes = [
    { path: config.routes.login, component: Login, layout: null},
    { path: config.routes.home, component: Home },
    { path: config.routes.profile, component: Profile},
    { path: config.routes.post, component: Post},
    { path: config.routes.room, component: Room},
];

export { publicRoutes, privateRoutes };
