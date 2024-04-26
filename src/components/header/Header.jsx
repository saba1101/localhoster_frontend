import style from "./Header.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Space, Button } from "antd";
import { SetAuth, SetUserDetails } from "../../store/AuthStore";
import { useNavigate } from "react-router";
import { serviceLogOut } from "../../services/logout";
const Header = () => {
  const { userDetails, isLoggedIn } = useSelector((state) => state.AuthStore);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogOut = async () => {
    const token = localStorage.getItem("token") || null;
    if (!token) return;
    await serviceLogOut(token);
    localStorage.setItem("token", null);
    localStorage.setItem("isLoggedIn", false);
    localStorage.setItem("userId", null);
    dispatch(SetAuth(false));
    dispatch(SetUserDetails({}));
    navigate("/authentication");
  };

  return !isLoggedIn ? (
    ""
  ) : (
    <header>
      <nav>
        <div className={style.logo}>
          <svg
            width="147"
            height="41"
            viewBox="0 0 157 41"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M83.1913 34.7098C81.6525 34.7098 80.4051 33.4624 80.4051 31.9236V6.15547C80.4051 4.60651 81.6607 3.35083 83.2097 3.35083C84.7587 3.35083 86.0143 4.60651 86.0143 6.15547V14.9488C86.0143 15.5301 85.3722 15.882 84.8822 15.5693L84.8193 15.5291C84.3901 15.2552 84.363 14.6394 84.7874 14.3581C85.7489 13.7209 86.8056 13.1877 87.9577 12.7585C89.4594 12.1991 90.9611 11.9193 92.4628 11.9193C94.1412 11.9193 95.5987 12.1991 96.8354 12.7585C98.0721 13.318 99.0291 14.2308 99.7063 15.4969C100.413 16.7336 100.766 18.412 100.766 20.532V31.9052C100.766 33.4541 99.5106 34.7098 97.9617 34.7098C96.4127 34.7098 95.157 33.4541 95.157 31.9052V21.5037C95.157 19.8548 94.7595 18.6328 93.9645 17.8378C93.1989 17.0133 92.0359 16.6011 90.4753 16.6011C89.6803 16.6011 88.8852 16.7189 88.0902 16.9545C87.4528 17.1433 86.8816 17.37 86.3767 17.6346C86.1483 17.7543 86.0139 17.9954 86.0133 18.2533L85.9775 31.9309C85.9734 33.4668 84.7272 34.7098 83.1913 34.7098Z"
              fill="#171E1D"
            />
            <path
              d="M113.601 35.3723C109.95 35.3723 107.211 34.3565 105.386 32.3248C103.56 30.2931 102.647 27.3633 102.647 23.5354C102.647 19.4426 103.575 16.4686 105.43 14.6136C107.314 12.7585 110.023 11.831 113.557 11.831C116.03 11.831 118.091 12.2727 119.74 13.156C121.389 14.0099 122.611 15.3055 123.406 17.0428C124.23 18.78 124.643 20.9443 124.643 23.5354C124.643 27.3633 123.686 30.2931 121.772 32.3248C119.887 34.3565 117.164 35.3723 113.601 35.3723ZM113.601 30.7789C114.896 30.7789 115.942 30.4845 116.737 29.8956C117.561 29.3067 118.165 28.4822 118.548 27.4222C118.93 26.3327 119.122 25.0371 119.122 23.5354C119.122 21.8571 118.916 20.4879 118.503 19.4278C118.121 18.3678 117.517 17.5875 116.693 17.087C115.898 16.5864 114.867 16.3361 113.601 16.3361C112.305 16.3361 111.26 16.6011 110.465 17.1311C109.67 17.6611 109.081 18.4561 108.698 19.5162C108.345 20.5762 108.168 21.9159 108.168 23.5354C108.168 25.891 108.595 27.6872 109.449 28.9239C110.303 30.1606 111.687 30.7789 113.601 30.7789Z"
              fill="#171E1D"
            />
            <path
              d="M133.078 35.3723C131.488 35.3723 130.134 35.1957 129.015 34.8423C128.322 34.6418 127.646 34.4131 126.987 34.1561C126.25 33.8684 125.79 33.1419 125.79 32.35V31.0921C125.79 30.0264 126.981 29.3748 127.91 29.8956C128.676 30.2783 129.486 30.5875 130.34 30.8231C131.223 31.0586 132.165 31.1764 133.166 31.1764C134.344 31.1764 135.213 30.9556 135.772 30.5139C136.361 30.0428 136.656 29.4833 136.656 28.8355C136.656 28.2172 136.435 27.7461 135.993 27.4222C135.551 27.0688 134.977 26.7744 134.271 26.5388C133.564 26.3033 132.813 26.0677 132.018 25.8321C131.282 25.6555 130.531 25.4199 129.765 25.1255C129.029 24.831 128.352 24.4335 127.734 23.9329C127.115 23.4324 126.615 22.7993 126.232 22.0337C125.879 21.2387 125.702 20.2817 125.702 19.1628C125.702 17.8378 125.967 16.7189 126.497 15.8061C127.027 14.8933 127.719 14.1572 128.573 13.5977C129.427 13.0383 130.369 12.6407 131.4 12.4052C132.43 12.1402 133.431 12.0077 134.403 12.0077C136.081 12.0666 137.436 12.2727 138.466 12.626C139.126 12.8333 139.761 13.0827 140.372 13.3743C141.011 13.679 141.386 14.3407 141.393 15.0484L141.393 15.0977C141.408 16.6045 139.794 17.578 138.422 16.9545C137.451 16.4833 136.346 16.2478 135.11 16.2478C133.961 16.2478 133.063 16.4539 132.416 16.8661C131.797 17.2489 131.488 17.7936 131.488 18.5003C131.488 19.1187 131.679 19.6192 132.062 20.002C132.445 20.3848 132.946 20.6792 133.564 20.8854C134.182 21.0915 134.859 21.2976 135.596 21.5037C136.332 21.7098 137.097 21.9454 137.892 22.2104C138.687 22.446 139.423 22.7993 140.101 23.2704C140.778 23.7415 141.323 24.3746 141.735 25.1696C142.177 25.9352 142.397 26.9658 142.397 28.2614C142.368 29.9692 141.912 31.3531 141.028 32.4131C140.145 33.4437 138.982 34.1945 137.539 34.6657C136.126 35.1368 134.639 35.3723 133.078 35.3723Z"
              fill="#171E1D"
            />
            <path
              d="M152.893 35.4165C150.596 35.4165 148.844 34.857 147.637 33.7381C146.43 32.5898 145.826 30.9409 145.826 28.7914V17.6022C145.826 17.1957 145.497 16.8661 145.09 16.8661H143.117C142.711 16.8661 142.381 16.5365 142.381 16.13V13.1855C142.381 12.7789 142.711 12.4494 143.117 12.4494H145.09C145.497 12.4494 145.826 12.1198 145.826 11.7132V9.20304C145.826 7.60529 147.121 6.31006 148.719 6.31006C150.317 6.31006 151.612 7.60529 151.612 9.20304V11.7132C151.612 12.1198 151.942 12.4494 152.348 12.4494H154.571C155.791 12.4494 156.78 13.4381 156.78 14.6577C156.78 15.8774 155.791 16.8661 154.571 16.8661H152.348C151.942 16.8661 151.612 17.1957 151.612 17.6022V27.908C151.612 28.8208 151.789 29.498 152.142 29.9397C152.496 30.3814 153.114 30.6022 153.997 30.6022C154.468 30.6022 154.954 30.5286 155.455 30.3814C156.049 30.1832 156.78 30.6027 156.78 31.2295V33.4139C156.78 34.154 156.367 34.8532 155.655 35.0564C155.392 35.1316 155.119 35.1928 154.836 35.2398C154.159 35.3576 153.511 35.4165 152.893 35.4165Z"
              fill="#171E1D"
            />
            <path
              d="M5.56512 31.9271C5.56512 33.4639 4.31932 34.7097 2.78256 34.7097C1.24579 34.7097 0 33.4639 0 31.9271V6.83993C0 5.30317 1.24579 4.05737 2.78256 4.05737C4.31932 4.05737 5.56512 5.30317 5.56512 6.83993V31.9271Z"
              fill="#171E1D"
            />
            <path
              d="M18.4013 35.3722C14.7501 35.3722 12.0117 34.3563 10.1862 32.3246C8.36056 30.2929 7.44776 27.3631 7.44776 23.5353C7.44776 19.4424 8.37528 16.4685 10.2303 14.6134C12.1148 12.7584 14.8238 11.8309 18.3572 11.8309C20.8305 11.8309 22.8917 12.2725 24.5406 13.1559C26.1895 14.0098 27.4115 15.3054 28.2065 17.0426C29.031 18.7799 29.4432 20.9441 29.4432 23.5353C29.4432 27.3631 28.4863 30.2929 26.5723 32.3246C24.6878 34.3563 21.9642 35.3722 18.4013 35.3722ZM18.4013 30.7788C19.6969 30.7788 20.7422 30.4843 21.5372 29.8954C22.3617 29.3065 22.9653 28.4821 23.3481 27.422C23.7309 26.3326 23.9223 25.037 23.9223 23.5353C23.9223 21.8569 23.7162 20.4877 23.3039 19.4277C22.9211 18.3677 22.3175 17.5874 21.4931 17.0868C20.698 16.5863 19.6675 16.336 18.4013 16.336C17.1057 16.336 16.0604 16.601 15.2654 17.131C14.4704 17.661 13.8815 18.456 13.4987 19.516C13.1454 20.5761 12.9687 21.9158 12.9687 23.5353C12.9687 25.8909 13.3957 27.687 14.2496 28.9237C15.1035 30.1604 16.4874 30.7788 18.4013 30.7788Z"
              fill="#171E1D"
            />
            <path
              d="M41.4561 35.1955C39.9839 35.1955 38.5705 34.9894 37.216 34.5772C35.8616 34.165 34.6543 33.5024 33.5943 32.5896C32.5343 31.6768 31.6951 30.499 31.0767 29.0562C30.4584 27.6134 30.1492 25.8614 30.1492 23.8003C30.1492 21.6508 30.4437 19.8252 31.0326 18.3235C31.6215 16.8218 32.4312 15.5998 33.4618 14.6576C34.4924 13.6859 35.6849 12.9939 37.0394 12.5817C38.4233 12.14 39.8808 11.9192 41.412 11.9192C42.5898 11.9192 43.797 12.037 45.0337 12.2725C45.7339 12.4059 46.3917 12.5723 47.0069 12.7718C47.839 13.0415 48.3463 13.85 48.3463 14.7247V14.9586C48.3463 16.46 46.7943 17.471 45.3429 17.0868C44.3417 16.7924 43.3112 16.6451 42.2511 16.6451C40.19 16.6451 38.5852 17.1604 37.4369 18.191C36.2885 19.2216 35.7143 20.9147 35.7143 23.2703C35.7143 25.6848 36.2296 27.4809 37.2602 28.6587C38.3202 29.8365 40.0575 30.4254 42.472 30.4254C43.5614 30.4254 44.6215 30.2635 45.652 29.9396C46.7022 29.5795 47.8503 30.4302 47.973 31.5335C48.0034 31.8059 48.0482 32.0711 48.1033 32.3501C48.2598 33.1424 47.8846 33.9529 47.1271 34.2329C46.4893 34.4687 45.8357 34.6571 45.1662 34.798C44.0473 35.063 42.8106 35.1955 41.4561 35.1955Z"
              fill="#171E1D"
            />
            <circle cx="61.4387" cy="10.57" r="2.98166" fill="#00C29F" />
            <path
              d="M78.0312 31.9272C78.0312 33.464 76.7854 34.7098 75.2487 34.7098C73.7119 34.7098 72.4661 33.464 72.4661 31.9272V6.09921C72.4661 4.56245 73.7119 3.31665 75.2487 3.31665C76.7854 3.31665 78.0312 4.56244 78.0312 6.09921V31.9272Z"
              fill="#171E1D"
            />
            <path
              d="M57.3906 39.1398C52.43 38.4047 48.9864 33.7864 49.7297 28.7709C49.9318 27.407 50.0684 26.6161 50.2515 25.2494C50.3499 24.4886 51.6447 20.9098 52.7672 19.786C54.568 17.9833 55.3226 17.7092 57.26 16.9897C59.593 16.1233 62.7313 16.5838 64.6936 15.2666C66.0399 14.3664 66.9497 12.9267 67.1883 11.3164C67.2111 11.1629 67.2272 11.0189 67.2365 10.8766C67.2441 10.7814 67.2479 10.6857 67.2503 10.5898C67.253 10.4926 67.2531 10.3951 67.2505 10.2984C67.2436 10.0719 67.2245 9.84887 67.1936 9.63463C66.9185 7.73325 65.7272 6.10884 64.0081 5.29104C63.8156 5.19922 63.6103 5.11473 63.3966 5.0435C63.3059 5.01292 63.2136 4.98473 63.1208 4.95912C63.0294 4.9337 62.9378 4.90958 62.8443 4.88913C62.7069 4.8569 62.566 4.83075 62.4154 4.80844C62.2648 4.78612 62.1211 4.7701 61.9803 4.7611C61.8862 4.75375 61.7915 4.75026 61.6966 4.74807C61.6004 4.74569 61.5039 4.74589 61.4082 4.74886C61.3361 4.75136 61.2638 4.75515 61.1941 4.75932C61.1244 4.76349 61.0542 4.77024 60.9865 4.77866C60.9189 4.78579 60.8526 4.79311 60.787 4.80449C60.6511 4.82391 60.5265 4.84632 60.4064 4.87336C58.5161 5.28157 56.9237 6.67149 56.2537 8.50005L56.2527 8.50651L56.2505 8.51277C56.234 8.55384 56.2159 8.60522 56.1973 8.66049C56.1667 8.75222 56.1385 8.84562 56.1129 8.9394C56.0875 9.03189 56.0633 9.12457 56.0428 9.21911C56.0352 9.25228 56.0279 9.28416 56.0217 9.31752C55.668 9.94421 54.9573 10.2951 54.2516 10.1906C53.4003 10.0644 52.7769 9.34305 52.7672 8.47527C52.8345 8.16217 52.9202 7.84784 53.0201 7.54353L53.0282 7.52364C54.4356 3.28968 58.6283 0.6869 62.9929 1.33368C65.3871 1.68846 67.5027 2.97248 68.9512 4.94752C70.4009 6.92274 71.0009 9.34301 70.6422 11.7636L67.7358 31.3763C66.9926 36.3918 62.3512 39.8748 57.3906 39.1398Z"
              fill="#00C29F"
            />
          </svg>
        </div>
        <ul>
          <li></li>
        </ul>
        <div className={style.userDetails}>
          <div className={style.avatar}></div>
          <Space>
            {/* <Dropdown menu={{ items }} trigger={["click"]}> */}
            <Space>
              <Avatar
                shape="square"
                style={{
                  backgroundColor: "#fde3cf",
                  color: "#f56a00",
                  verticalAlign: "middle",
                }}
                size="large"
              >
                {userDetails?.UserName}
              </Avatar>
              {/* <span style={{ cursor: "pointer" }}>Profile</span> */}
              {/* <DownOutlined /> */}
            </Space>
            {/* </Dropdown> */}
            <Button size={"large"} type="primary" danger onClick={onLogOut}>
              <Space>
                <UserOutlined />
                <span style={{ cursor: "pointer" }}>Logout</span>
              </Space>
            </Button>
          </Space>

          <div className={style.userOptions}></div>
        </div>
      </nav>
    </header>
  );
};

export default Header;