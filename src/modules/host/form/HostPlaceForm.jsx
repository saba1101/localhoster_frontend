import { Input, Select, Upload } from "antd";

export const HostPlaceForm = [
  {
    component: Input,
    key: "NAME",
    props: {
      value: null,
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
      value: null,
      placeholder: "Enter Description",
      size: "large",
      type: "text",
    },
  },
  {
    component: Input,
    key: "PRICE",
    props: {
      value: null,
      placeholder: "Enter Price",
      size: "large",
      type: "number",
    },
  },
  {
    component: Input,
    key: "ABOUT",
    props: {
      value: null,
      placeholder: "Enter article about place",
      size: "large",
      type: "text",
    },
  },
  {
    component: Select,
    key: "AMENITIES",
    props: {
      style: { width: "100%" },
      value: [],
      mode: "multiple",
      placeholder: "Choose Amenities",
      size: "large",
      options: [],
    },
  },
  {
    component: Upload,
    key: "IMAGES",
    props: {
      accept: "image/png, image/jpeg",
      style: { width: "100%" },
      value: [],
      listType: "picture-card",
      fileList: [],
      size: "large",
    },
  },
];
