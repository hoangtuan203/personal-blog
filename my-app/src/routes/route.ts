import Home from "../pages/client/Home/Home";
import ListBlog from "../pages/client/Blog/ListBlog";
import Tag from "../pages/client/Tag/Tag";
import Forum from "../pages/client/Forum/Forum";
import EditProfile from "../pages/client/Profile/EditProfile";
import DetailBlog from "../pages/client/Blog/DetailBlog";
import DefaultLayout from "../components/layouts/client/DefaultLayout";

const publicRoutes = [
  { path: "/", component: Home, layout: DefaultLayout },
  { path: "/blog", component: ListBlog, layout: DefaultLayout },
  { path: "/blog/:postId", component: DetailBlog, layout: DefaultLayout },
  { path: "/profile/edit", component: EditProfile, layout: DefaultLayout },
  { path: "/tags", component: Tag, layout: DefaultLayout },
  { path: "/forum", component: Forum, layout: DefaultLayout },

];

export default publicRoutes;