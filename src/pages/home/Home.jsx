import { Fragment, useEffect, useState } from "react";
import style from "./Home.module.scss";
import { getAllHosts } from "../../services/product";

import { Avatar, Card, Spin } from "antd";
const Home = () => {
  const [dataHostedPlaces, setDataHostedPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { Meta } = Card;

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
                cover={
                  <img
                    alt="cover"
                    style={{
                      width: "100%",
                      height: "100%",
                      aspectRatio: "5/4",
                    }}
                    src={host.Images[0] ? host.Images[0] : ""}
                  />
                }
              >
                <Meta
                  avatar={
                    <Avatar
                      shape="round"
                      style={{
                        backgroundColor: "#518e86",
                        color: "#ffffff",
                        verticalAlign: "middle",
                      }}
                      size="medium"
                    >
                      {host.Author}
                    </Avatar>
                  }
                  title={`${host.Name} / Hosted By ${host.Author}`}
                  description={host.Description}
                />
              </Card>
            );
          })}
      </div>
    </Fragment>
  );
};

export default Home;
