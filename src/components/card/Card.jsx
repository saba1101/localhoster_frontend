import { Fragment } from "react";
import style from "./Card.module.scss";
import { StarFilled } from "@ant-design/icons";
import { Tooltip } from "antd";
const Card = ({ name, image, price, rate, description, onClick }) => {
  return (
    <Fragment>
      <div className={style.cardContainer} onClick={onClick}>
        <div className={style.cardCover}>
          <div
            className={style.imageFrame}
            style={{
              backgroundImage: `url(${image.length && image.split(",")[0]},${
                image.length && image.split(",")[1]
              })`,
            }}
          ></div>
        </div>
        <div className={style.cardBody}>
          <div className={style.topContent}>
            <div>
              <Tooltip title={name}>
                <h2>{name}</h2>
              </Tooltip>
              <Tooltip title={description}>
                <p>{description?.slice(0, 47)}...</p>
              </Tooltip>
            </div>
            <div className={style.rating}>
              <span>{rate}</span>
              <span>
                <StarFilled style={{ color: "orange" }} />
              </span>
            </div>
          </div>
          <div className={style.bottomContent}>
            <h1 className={style.price}>
              ${price}
              <span>/night</span>
            </h1>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Card;
