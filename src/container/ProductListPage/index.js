import React from "react";
import Layout from "../../Component/Layout";
import getParams from "../../utils/getParams";
import ClothingAndAccessories from "./ClothingAndAccessories";
import ProductPage from "./ProductPage";
import ProductStore from "./ProductStore";

const ProductListPage = (props) => {
  getParams();

  const renderProduct = () => {
    const params = getParams(props.location.search);
    let content = null;
    switch (params.type) {
      case "page":
        content = <ProductPage {...props} />;
        break;
      case "store":
        content = <ProductStore {...props} />;
        break;
      default:
        content = <ClothingAndAccessories {...props} />;
    }
    return content;
  };
  return <Layout sidebar>{renderProduct()}</Layout>;
};

export default ProductListPage;
