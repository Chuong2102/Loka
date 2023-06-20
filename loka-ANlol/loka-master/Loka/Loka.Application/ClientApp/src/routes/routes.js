import config from '~/config';

// Pages
import Home from '~/pages/Home';
import Favourite from '~/pages/Favourite';
import Upload from '~/pages/Upload';
import SearchResult from '~/pages/SearchResult';
import Profile from '~/pages/Profile';
import PostDetail from '~/pages/PostDetail';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.favourite, component: Favourite },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.upload, component: Upload},
    { path: config.routes.search, component: SearchResult},
    { path: config.routes.detail, component: PostDetail},

];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
