import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySlug } from "../../../actions/product.action";
import "../style.css";
import { generatePublicUrl } from "../../../urlConfig";
import { Link } from "react-router-dom";
import Card from "../../../Component/UI/Card";
import { MaterialButton } from "../../../Component/MaterialUI";

const ProductStore = (props) => {
  const priceRange = {
    under5k: 5000,
    under10k: 10000,
    under15k: 15000,
    under20k: 20000,
    under35k: 35000,
  };
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const { match } = props;
  useEffect(() => {
    dispatch(getProductsBySlug("Samsung-Mu-IqVtM3"));
  }, []);
  return (
    <div>
      {Object.keys(product.productsByPrice).map((key, index) => {
        return (
          <Card
            headerLeft={`${props.match.params.slug} mobile under ${priceRange[key]}`}
            headerRight={
              <MaterialButton
                title={"VIEW ALL"}
                style={{
                  width: "96px",
                }}
                bgColor="#2874f0"
                fontSize="12px"
              />
            }
            style={{
              width: "calc(100% - 40px)",
              margin: "20px",
            }}
          >
            <div className="cardHeader">
              <div>
                {`${match.params.slug} mobile under ${priceRange[key]}`}
              </div>
              <button>View All </button>
            </div>
            <div style={{ display: "flex" }}>
              {product.productsByPrice[key].map((product, index) => (
                <Link
                  to={`/${product.slug}/${product._id}`}
                  style={{ display: "block" }}
                  className="productContainer"
                  key={index}
                >
                  <div className="productImgContainer">
                    <img
                      src={generatePublicUrl(product.productPictures[0].img)}
                      alt=""
                    />
                  </div>
                  <div className="productInfo">
                    <div style={{ margin: "5px 0" }}>{product.name}</div>
                    <div>
                      <span>4.3</span>
                      <div>3353</div>
                    </div>
                    <div className="productPrice">{product.price}</div>
                  </div>
                </Link>
              ))}
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default ProductStore;
