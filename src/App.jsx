import { Fragment, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { routes } from "@/router/router.jsx";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setupAxiosInterceptors } from "./utils/axios";
import Header from "./components/header/Header";
import { getUserDetails } from "./services/user";
import { SetAuth, SetUserDetails } from "./store/AuthStore";
function App() {
  const { isLoggedIn } = useSelector((state) => state.AuthStore.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkLoginStatus = async () => {
    dispatch(
      SetAuth(
        localStorage.getItem("isLoggedIn") == "true"
          ? Boolean(localStorage.getItem("isLoggedIn"))
          : false
      )
    );
    if (
      (localStorage.getItem("isLoggedIn") == "false" && !isLoggedIn) ||
      (!isLoggedIn && !localStorage.getItem("isLoggedIn"))
    ) {
      navigate("/authentication");
    } else {
      const userId = localStorage.getItem("userId");
      userId &&
        (await getUserDetails(userId).then((response) => {
          dispatch(SetUserDetails(response.data));
        }));
    }
  };

  useEffect(() => {
    setupAxiosInterceptors(dispatch);
  }, [dispatch]);
  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <Fragment>
      <Header />
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
