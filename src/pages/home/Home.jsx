import { Fragment } from "react";
import Axios from "../../utils/axios";

const Home = () => {
  Axios.get("user/getall").then((resp) => {
    console.log(resp);
  });
  return (
    <Fragment>
      <h1>Home Page</h1>
    </Fragment>
  );
};

export default Home;
