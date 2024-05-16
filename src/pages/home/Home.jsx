import { Fragment, useEffect, useState } from "react";
import style from "./Home.module.scss";
import { getAllHosts } from "../../services/product";
import Card from "../../components/card/Card";
import { Spin } from "antd";
const Home = () => {
  const [dataHostedPlaces, setDataHostedPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const initialCalls = async () => {
    setIsLoading(true);
    try {
      await getAllHosts().then((response) => {
        setDataHostedPlaces(response.data);
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    initialCalls();
  }, []);
  return (
    <Fragment>
      <Spin tip="Loading..." size="large" spinning={isLoading} fullscreen />

      <div className={style.hostedPlacesContainer}>
        {dataHostedPlaces.length &&
          dataHostedPlaces.map((host, index) => {
            return (
              <Card
                key={index}
                image={host.Images[0] ? host.Images[0] : ""}
                name={host.Name}
                price={host.Price}
                rate={0}
                description={host.Description}
              />
            );
          })}
      </div>
    </Fragment>
  );
};

export default Home;
