import config from '~/config';

// Pages
import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import Post from '~/pages/Post';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.post, component: Post},

];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
