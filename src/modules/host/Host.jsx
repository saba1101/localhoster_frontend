import { Button, Empty, Modal, Popconfirm, Card, Segmented } from "antd";
import style from "@/modules/host/Host.module.scss";
import { useEffect, useRef, useState } from "react";
import { CategoryForm } from "./form/CategoryForm";
import { HostPlaceForm } from "./form/HostPlaceForm";
import {
  createCategory,
  getCategories,
  deleteCategory,
  updateCategory,
} from "../../services/product";
import { openNotificationWithIcon } from "../../utils/useNotification";
import {
  EditOutlined,
  DeleteFilled,
  HomeFilled,
  TagFilled,
} from "@ant-design/icons";

const Host = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOptions, setModalOptions] = useState({});
  const [categoryForm, setCategoryForm] = useState([]);
  const [hostPlaceform, setHostPlaceform] = useState([]);
  const [dataCategories, setDataCategories] = useState([]);
  const [dataHostedPlaces, setDataHostedPlaces] = useState([]);
  const [currentTab, setCurentTab] = useState("CATEGORIES");
  const tabOptions = useRef([
    {
      label: "Categories",
      value: "CATEGORIES",
      icon: <TagFilled />,
    },
    {
      label: "Hosted Places",
      value: "HOSTED_PLACES",
      icon: <HomeFilled />,
    },
  ]);

  const { Meta } = Card;
  const onModalOpen = (type) => {
    switch (type) {
      case "CREATE_CATEGORY": {
        setModalOptions({
          title: "Create Category",
          template: TemplateCategoryForm,
          requestType: "CREATE_CATEGORY",
        });
        break;
      }
      case "CREATE_HOST": {
        setModalOptions({
          title: "Host a Place",
          template: TemplateHotsPlaceForm,
          requestType: "CREATE_HOST",
        });
        break;
      }
    }
    setIsModalOpen(true);
  };

  const onModalClose = () => {
    setIsModalOpen(false);
    setModalOptions({});
    categoryForm.find((el) => el.key === "NAME").props.value = "";
    categoryForm.find((el) => el.key === "DESCRIPTION").props.value = "";
  };

  const onTabChange = (e) => {
    setCurentTab(e);
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
      case "UPDATE_CATEGORY": {
        DataSet = {
          Title: categoryForm.find((el) => el.key === "NAME").props.value,
          Description: categoryForm.find((el) => el.key === "DESCRIPTION").props
            .value,
        };
        await updateCategory(modalOptions.itemId, DataSet).then(() => {
          openNotificationWithIcon("success", "Category Successfully Updated");
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

  const updateSingleCategory = (category) => {
    setIsModalOpen(true);
    categoryForm.find((el) => el.key === "NAME").props.value = category.Title;
    categoryForm.find((el) => el.key === "DESCRIPTION").props.value =
      category.Description;
    setModalOptions({
      title: `Update ${category.Title} Category`,
      template: TemplateCategoryForm,
      requestType: "UPDATE_CATEGORY",
      itemId: category._id,
    });
  };

  const deleteSingleCategory = async (id) => {
    await deleteCategory(id).then(() => {
      getAndUpdateCategories();
      openNotificationWithIcon("success", "Category Deleted Successfully");
    });
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
  const TemplateHotsPlaceForm = () => {
    return (
      <ul>
        {hostPlaceform.map((element, index) => {
          return (
            <li key={index}>
              {
                <element.component
                  {...element.props}
                  onChange={(e) =>
                    updateValues("CREATE_HOST", element.key, e.target.value)
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
    setHostPlaceform(HostPlaceForm);
    getAndUpdateCategories();
  }, []);

  return (
    <>
      <div className={style.contentHost}>
        <div className={style.contentHeader}>
          <Segmented
            options={tabOptions.current}
            value={currentTab}
            onChange={onTabChange}
            size="medium"
          />

          <Button
            size="small"
            type="primary"
            onClick={() => onModalOpen("CREATE_CATEGORY")}
          >
            Create Category
          </Button>
          <Button
            size="small"
            type="primary"
            onClick={() => onModalOpen("CREATE_HOST")}
            style={{ background: "#00c29f" }}
          >
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
          {currentTab === "CATEGORIES" ? (
            <div className={style.categories}>
              {!dataCategories.length ? (
                <Empty />
              ) : (
                dataCategories.map((category, index) => {
                  return (
                    <Card
                      key={index}
                      actions={[
                        <EditOutlined
                          key="edit"
                          onClick={() => updateSingleCategory(category)}
                        />,
                        <Popconfirm
                          title={`Delete Category `}
                          description={`Are you sure to delete ${category.Title} ?`}
                          key={"delete-confirm"}
                          onConfirm={() => deleteSingleCategory(category._id)}
                        >
                          <DeleteFilled />
                        </Popconfirm>,
                      ]}
                    >
                      <Meta
                        avatar={<HomeFilled />}
                        title={category.Title}
                        description={category.Description}
                      />
                    </Card>
                  );
                })
              )}
            </div>
          ) : (
            <div className={style.hosted}>
              <Empty />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Host;
