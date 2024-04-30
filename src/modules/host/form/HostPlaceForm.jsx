import { Input } from "antd";

export const HostPlaceForm = [
  {
    component: Input,
    key: "NAME",
    props: {
      value: "",
      placeholder: "Enter Host Name",
      size: "large",
      type: "text",
      required: true,
    },
  },
  {
    component: Input,
    key: "DESCRIPTION",
    props: {
      value: "",
      placeholder: "Enter Host Locaton",
      size: "large",
      type: "text",
    },
  },
];
