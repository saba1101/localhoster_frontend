import Input from "antd/es/input/Input";
import { UserOutlined, SecurityScanOutlined } from "@ant-design/icons";
export const LoginForm = [
  {
    component: Input,
    key: "USERNAME",
    props: {
      value: "",
      placeholder: "Username",
      size: "large",
      prefix: <UserOutlined />,
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
      prefix: <SecurityScanOutlined />,
    },
  },
];
