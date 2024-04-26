import { Fragment, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { routes } from "@/router/router.jsx";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Axios, { setupAxiosInterceptors } from "./utils/axios";
function App() {
  const { isLoggedIn } = useSelector((state) => state.AuthStore.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  Axios.get("/user/getAll");
  const checkLoginStatus = () => {
    if (localStorage.getItem("isLoggedIn") == "false" && !isLoggedIn) {
      navigate("/authentication");
    } else {
      navigate("/");
    }
  };
  useEffect(() => {
    setupAxiosInterceptors(dispatch);
  }, [dispatch]);
  useEffect(() => {
    checkLoginStatus();
  }, [isLoggedIn]);

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
