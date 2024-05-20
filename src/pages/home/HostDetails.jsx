import { useParams } from "react-router";
import style from "@/pages/home/HostDetails.module.scss";
import { Fragment, useEffect, useState } from "react";
import { getSingleHost } from "../../services/product";
import { Spin } from "antd";
const HostDetailes = () => {
  const params = useParams();
  const { id } = params;
  const [details, setDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(1);
  const getHostDetails = async () => {
    setIsLoading(true);
    try {
      await getSingleHost(id).then((response) => {
        setDetails(response.data);
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getHostDetails();
  }, []);
  return (
    <Fragment>
      <Spin tip="Loading..." size="large" spinning={isLoading} fullscreen />

      {!isLoading && Object.keys(details).length && (
        <div className={style.hostDetailsContainer}>
          <div className={style.topContent}>
            <div className={style.images}>
              <div className={style.mainImage}>
                <img src={details?.Images[currentImageIndex]} />
              </div>
              <div className={style.imagesList}>
                {details?.Images.map((img, ind) => {
                  return (
                    <div key={ind} onClick={() => setCurrentImageIndex(ind)}>
                      <img src={img} />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={style.details}></div>
          </div>
          <div className={style.middleContent}>
            <p></p>
          </div>
          <div className={style.bottomContent}></div>
        </div>
      )}
    </Fragment>
  );
};

export default HostDetailes;
