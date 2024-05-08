import { Input } from "antd";

export const CategoryForm = [
  {
    component: Input,
    key: "NAME",
    props: {
      value: "",
      placeholder: "Enter Category Name",
      size: "large",
      type: "text",
    },
  },
  {
    component: Input,
    key: "DESCRIPTION",
    props: {
      value: "",
      placeholder: "Enter Category Description",
      size: "large",
      type: "text",
    },
  },
];
