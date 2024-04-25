import { Fragment, useEffect, useState } from "react";
import style from "@/pages/authentication/Authentication.module.scss";
import Login from "@/modules/authentication/Login";
import Register from "@/modules/authentication/Register";
import { Tabs, Button } from "antd";
import { LoginForm } from "@/modules/authentication/form/LoginForm.jsx";
import { RegisterForm } from "@/modules/authentication/form/RegisterForm";
import { serviceRegister } from "../../services/register";
import { openNotificationWithIcon } from "../../utils/useNotification";
import { serviceLogin } from "../../services/login";
import { useStore } from "../../store/store";
const Authentication = () => {
  const [view, setView] = useState("LOGIN");
  const [tabs, setTabs] = useState([]);
  const [form, setForm] = useState([]);
  const { setAuthState } = useStore();
  const submit = async (e, type) => {
    e.stopPropagation();
    e.preventDefault();
    let dataSet = {};
    switch (type) {
      case "LOGIN": {
        dataSet = {
          UserName: form.find((el) => el.key === "USERNAME").props.value,
          Password: form.find((el) => el.key === "PASSWORD").props.value,
        };
        await serviceLogin(JSON.stringify(dataSet)).then((response) => {
          if (response.data) {
            window.localStorage.setItem("token", response.data.token);
            window.localStorage.setItem("isLoggedIn", true);
            setForm((prev) => {
              const newForm = [...prev];
              newForm.forEach((el) => (el.props.value = ""));
              return newForm;
            });
            openNotificationWithIcon(
              "success",
              "Login Complete",
              response.data.message
            );
            setAuthState({ isLoggedIn: true });
          } else {
            setAuthState({ isLoggedIn: false });
            window.localStorage.setItem("isLoggedIn", false);
          }
        });
        break;
      }
      case "REGISTER": {
        dataSet = {
          Email: form.find((el) => el.key === "EMAIL").props.value,
          UserName: form.find((el) => el.key === "USERNAME").props.value,
          Password: form.find((el) => el.key === "PASSWORD").props.value,
        };
        await serviceRegister(JSON.stringify(dataSet)).then((response) => {
          if (response.data) {
            setForm((prev) => {
              const newForm = [...prev];
              newForm.forEach((el) => (el.props.value = ""));
              return newForm;
            });
            openNotificationWithIcon(
              "success",
              "Register Complete",
              "User Create Successfully"
            );
          }
        });
        break;
      }
    }
  };

  const onTabClick = (key) => {
    setView(key === 1 ? "LOGIN" : "REGISTER");
  };

  const updateFormValues = (event, key) => {
    setForm((prev) => {
      const newForm = [...prev];
      newForm.find((element) => element.key === key).props.value =
        event.target.value;
      return newForm;
    });
  };

  useEffect(() => {
    setTabs([
      {
        label: `SignIn`,
        key: 1,
        children: <Login data={form} updateFormValues={updateFormValues} />,
      },
      {
        label: `SignUp`,
        key: 2,
        children: <Register data={form} updateFormValues={updateFormValues} />,
      },
    ]);
  }, [form]);

  useEffect(() => {
    setForm(view === "LOGIN" ? LoginForm : RegisterForm);
  }, [view]);

  return (
    <Fragment>
      <div className={style.authenticaionContainer}>
        <div className={style.authenticaionField}>
          <form onSubmit={(e) => submit(e, view)}>
            <Tabs
              onTabClick={onTabClick}
              type={"card"}
              items={tabs}
              animated={true}
            />
            <Button
              htmlType="submit"
              type="primary"
              size={"large"}
              style={{ marginTop: "2rem" }}
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Authentication;
