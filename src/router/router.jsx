import Authentication from "@/pages/authentication/Authentication.jsx";
import Home from "@/pages/home/Home";
import BecomeAHost from "@/pages/host/BecomeAHost";
export const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/authentication",
    element: <Authentication />,
  },
  {
    path: "/becomeahost",
    element: <BecomeAHost />,
  },
];
