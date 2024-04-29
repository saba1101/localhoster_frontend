import { Button, Empty, Modal, Space, Card, Tabs } from "antd";
import style from "@/modules/host/Host.module.scss";
import { useEffect, useState } from "react";
import { CategoryForm } from "./form/CategoryForm";
import { createCategory, getCategories } from "../../services/product";
import { openNotificationWithIcon } from "../../utils/useNotification";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const Host = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOptions, setModalOptions] = useState({});
  const [categoryForm, setCategoryForm] = useState([]);
  const [dataCategories, setDataCategories] = useState([]);
  const { Meta } = Card;

  const onModalOpen = () => {
    setIsModalOpen(true);
    setModalOptions({
      title: "Create Category",
      template: TemplateCategoryForm,
      requestType: "CREATE_CATEGORY",
    });
  };

  const onModalClose = () => {
    setIsModalOpen(false);
    setModalOptions({});
  };

  const updateValues = (type, key, value) => {
    switch (type) {
      case "CREATE_CATEGORY": {
        setCategoryForm((prev) => {
          const newCategoryForm = [...prev];
          newCategoryForm.find((el) => el.key === key).props.value = value;
          return newCategoryForm;
        });
        break;
      }
      case "CREATE_HOST": {
        break;
      }
    }
  };

  const submitForm = async (event) => {
    event.preventDefault();
    let DataSet = {};
    switch (modalOptions.requestType) {
      case "CREATE_CATEGORY": {
        DataSet = {
          Title: categoryForm.find((el) => el.key === "NAME").props.value,
          Description: categoryForm.find((el) => el.key === "DESCRIPTION").props
            .value,
        };
        await createCategory(DataSet).then(() => {
          openNotificationWithIcon("success", "Category Added Successfully");
          getAndUpdateCategories();
        });

        break;
      }
      case "CREATE_HOST": {
        break;
      }
    }
    setModalOptions({});
    setIsModalOpen(false);
  };

  const getAndUpdateCategories = async () => {
    await getCategories().then((response) => {
      setDataCategories(response.data.categories);
    });
  };

  const TemplateCategoryForm = () => {
    return (
      <ul>
        {categoryForm.map((element, index) => {
          return (
            <li key={index}>
              {
                <element.component
                  {...element.props}
                  onChange={(e) =>
                    updateValues("CREATE_CATEGORY", element.key, e.target.value)
                  }
                />
              }
            </li>
          );
        })}
      </ul>
    );
  };

  useEffect(() => {
    setCategoryForm(CategoryForm);
    getAndUpdateCategories();
  }, []);

  return (
    <>
      <div className={style.contentHost}>
        <div className={style.contentHeader}>
          <Button type="primary" onClick={onModalOpen}>
            Create Category
          </Button>
          <Button type="primary" style={{ background: "#00c29f" }}>
            Host A Place
          </Button>
        </div>
        <Modal
          open={isModalOpen}
          okText="Save"
          onOk={submitForm}
          onCancel={onModalClose}
        >
          <div className={style.modalTitle}>
            <h1>{modalOptions?.title}</h1>
            <div className={style.modalForm}>
              {isModalOpen && modalOptions?.template()}
            </div>
          </div>
        </Modal>
        <div className={style.contentBody}>
          <Empty />
          <Tabs />
          {dataCategories.map((category, index) => {
            return (
              <Card
                key={index}
                style={{ width: 300 }}
                actions={[
                  <EditOutlined key="edit" />,
                  <DeleteOutlined key="delete" />,
                ]}
              >
                <Meta
                  title={category.Title}
                  description={category.Description}
                ></Meta>
              </Card>
            );
          })}
          <div className={style.hosted}></div>
        </div>
      </div>
    </>
  );
};

export default Host;
