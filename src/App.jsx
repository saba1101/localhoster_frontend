import { Fragment, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { routes } from "@/router/router.jsx";
import { useStore } from "./store/store";
function App() {
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const navigate = useNavigate();
  const checkLoginStatus = () => {
    if (!window.localStorage.getItem("isLoggedIn") && !isLoggedIn) {
      navigate("/authentication");
    } else navigate("/");
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <Fragment>
      <Routes>
        {routes.map((route) => {
          return (
            <Route
              path={route.path}
              key={route.path}
              element={route.element}
            ></Route>
          );
        })}
      </Routes>
    </Fragment>
  );
}

export default App;
