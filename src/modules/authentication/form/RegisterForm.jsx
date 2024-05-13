import Input from "antd/es/input/Input";
import {
  UserOutlined,
  SecurityScanOutlined,
  GooglePlusOutlined,
} from "@ant-design/icons";
export const RegisterForm = [
  {
    component: Input,
    key: "EMAIL",
    props: {
      value: "",
      placeholder: "Email",
      size: "large",
      type: "email",
      prefix: <GooglePlusOutlined />,
    },
  },
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
