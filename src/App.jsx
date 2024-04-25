import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from "@/router/router.jsx";
function App() {
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
