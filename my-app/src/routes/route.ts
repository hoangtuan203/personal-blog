import DefaultLayout from "../components/layouts/client/DefaultLayout";
import Home from "../pages/client/Home/Home";
import DetailBlog from "../pages/client/Blog/DetailBlog";
import ListBlog from "../pages/client/Blog/ListBlog";
import { EditProfile } from "../pages/client/Profile/EditProfile";

const publicRoutes = [
  { path: "/", component: Home, layout: DefaultLayout },
  { path: "/blog", component: ListBlog, layout: DefaultLayout },
  { path: "/blog/:postId", component: DetailBlog, layout: DefaultLayout },
  { path: "/profile", component: EditProfile, layout: DefaultLayout },
];

export default publicRoutes;
