import Authentication from "@/pages/authentication/Authentication.jsx";
import Home from "@/pages/home/Home";
export const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/authentication",
    element: <Authentication />,
  },
];
