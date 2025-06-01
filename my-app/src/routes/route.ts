import DefaultLayout from "../components/layouts/client/DefaultLayout";
import Home from "../pages/client/Home/Home";

const publicRoutes = [
    {path: "/", component: Home, layout: DefaultLayout},
]

export default publicRoutes;