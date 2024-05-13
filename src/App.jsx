import { Fragment, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { routes } from "@/router/router.jsx";
import { useSelector, useDispatch } from "react-redux";
import { setupAxiosInterceptors } from "./utils/axios";
import Header from "./components/header/Header";
import { getUserDetails } from "./services/user";
import { SetAuth, SetUserDetails } from "./store/AuthStore";
import NotFound from "./components/404";

function App() {
  const isLoggedIn = useSelector((state) => state.AuthStore.isLoggedIn);
  const [isAxiosValid, setIsAxiosValid] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkLoginStatus = async () => {
    if (!isLoggedIn) {
      const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      dispatch(SetAuth(storedIsLoggedIn));
      if (!storedIsLoggedIn) {
        navigate("/authentication");
      } else {
        const userId = localStorage.getItem("userId");
        if (userId) {
          const response = await getUserDetails(userId);
          dispatch(SetUserDetails(response.data));
        }
      }
    }
  };

  useEffect(() => {
    setupAxiosInterceptors(dispatch);
    checkLoginStatus();
    setIsAxiosValid(true);
  }, [dispatch]);

  return (
    <Fragment>
      <Header />
      {isAxiosValid && (
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </Fragment>
  );
}

export default App;
