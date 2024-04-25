import Input from "antd/es/input/Input";
export const LoginForm = [
  {
    component: Input,
    key: "USERNAME",
    props: {
      value: "",
      placeholder: "Username",
      size: "large",
    },
  },
  {
    component: Input,
    key: "PASSWORD",
    props: {
      value: "",
      placeholder: "Password",
      type: "password",
      size: "large",
    },
  },
];
