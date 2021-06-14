import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowForward, IoIosStar, IoMdCart } from "react-icons/io";
import { BiRupee } from "react-icons/bi";
import { AiFillThunderbolt } from "react-icons/ai";
import { getProductDetailsById } from "../../actions/product.action";
import { MaterialButton } from "../../Component/MaterialUI";
import Layout from "../../Component/Layout";
import { generatePublicUrl } from "../../urlConfig";
import { addToCart } from "../../actions/cart.actions";
import ReactImageZoom from "react-image-zoom";
import "./style.css";
import { Scroll } from "../../Component/Scroll";
import { getAllComments } from "../../actions/comment.actions";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Comment from "../../Component/Comment";

const ProductDetailsPage = (props) => {
  const { productId } = props.match.params;

  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const comment = useSelector((state) => state.comment);
  console.log(comment);
  const [imgSelected, setImgSelected] = useState(0);

  useEffect(() => {
    const payload = {
      params: {
        productId,
      },
    };
    console.log("reload");
    dispatch(getProductDetailsById(payload));
    dispatch(getAllComments(productId));
  }, []);

  if (Object.keys(product.productDetails).length === 0) {
    return null;
  }
  if (Object.keys(comment.comment).length === 0) {
    return null;
  }

  return (
    <Layout>
      {/* <Scroll /> */}
      <div className="productDescriptionContainer">
        <div className=" sticky">
          <div className="productDescContainer " style={props}>
            <div className="flexRow ">
              <div className="verticalImageStack">
                {product &&
                  product.productDetails.productPictures.map((thumb, index) => (
                    <div
                      className={`thumbnail ${
                        index === imgSelected ? "active" : ""
                      }`}
                      key={index}
                      onMouseEnter={() => setImgSelected(index)}
                    >
                      <img src={generatePublicUrl(thumb.img)} alt={thumb.img} />
                    </div>
                  ))}
              </div>
              <ReactImageZoom
                width={400}
                zoomWidth={600}
                zoomPosition={"right"}
                img={generatePublicUrl(
                  product.productDetails.productPictures[imgSelected].img
                )}
              />
            </div>

            {/* action buttons */}
            <div className="flexRow ml">
              <MaterialButton
                title="ADD TO CART"
                bgColor="#ff9f00"
                textColor="#ffffff"
                style={{
                  marginRight: "5px",
                }}
                icon={<IoMdCart />}
                onClick={() => {
                  const { _id, name, price } = product.productDetails;
                  const img = product.productDetails.productPictures[0].img;
                  dispatch(addToCart({ _id, name, price, img }));
                  // props.history.push(`/cart`);
                }}
              />
              <MaterialButton
                title="BUY NOW"
                bgColor="#fb641b"
                textColor="#ffffff"
                style={{
                  marginLeft: "5px",
                }}
                icon={<AiFillThunderbolt />}
              />
            </div>
          </div>
        </div>
        <div className="product">
          {/* home > category > subCategory > productName */}
          <div className="breed">
            <ul>
              <li>
                <a href="./#">Home</a>
                <IoIosArrowForward />
              </li>
              <li>
                <a href="./#">Mobiles</a>
                <IoIosArrowForward />
              </li>
              <li>
                <a href="./#">Samsung</a>
                <IoIosArrowForward />
              </li>
              <li>
                <a href="./#">{product.productDetails.name}</a>
              </li>
            </ul>
          </div>
          {/* product description */}
          <div className="productDetails">
            <p className="productTitle">{product.productDetails.name}</p>
            <div className=" productImgDes-mobile">
              <div className="productImgDes-mobile_img">
                <ReactImageZoom
                  width={600}
                  zoomWidth={600}
                  zoomPosition={"right"}
                  img={generatePublicUrl(
                    product.productDetails.productPictures[imgSelected].img
                  )}
                />
              </div>
              <div className="verticalImageStack">
                {product &&
                  product.productDetails.productPictures.map((thumb, index) => (
                    <div
                      className={`thumbnail ${
                        index === imgSelected ? "active" : ""
                      }`}
                      key={index}
                      onMouseEnter={() => setImgSelected(index)}
                    >
                      <img src={generatePublicUrl(thumb.img)} alt={thumb.img} />
                    </div>
                  ))}
              </div>
            </div>
            <div className="ratingProduct">
              <span className="ratingCount">
                4.3 <IoIosStar />
              </span>
              <span className="ratingNumbersReviews">
                72,234 Ratings & 8,140 Reviews
              </span>
            </div>
            <div className="extraOffer">
              Extra <BiRupee />
              4500 off{" "}
            </div>
            <div className="flexRow priceContainer">
              <span className="price">
                <BiRupee />
                {product.productDetails.price}
              </span>
              <span className="pre-price">
                <BiRupee />
                {product.productDetails.price * 1.22}
              </span>
              <span className="discount" style={{ margin: "0 10px" }}>
                22% off
              </span>
            </div>
            <div>
              <p
                style={{
                  color: "#212121",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                Available Offers
                <div className="offer-items">
                  <div className="offer-item">
                    <LocalOfferIcon
                      style={{ color: "#16bd49", fontSize: "20px" }}
                    />
                    <p>Bank Offer</p>
                    <span className="text">
                      5% Unlimited Cashback on Flipkart Axis Bank Credit Card
                    </span>
                    <a href="./#">T&C</a>
                  </div>
                  <div className="offer-item">
                    <LocalOfferIcon
                      style={{ color: "#16bd49", fontSize: "20px" }}
                    />
                    <p>Bank Offer</p>
                    <span className="text">
                      10% Off on Bank of Baroda Mastercard debit card first time
                      transaction, Terms and Condition apply
                    </span>
                    <a href="./#">T&C</a>
                  </div>
                  <div className="offer-item">
                    <LocalOfferIcon
                      style={{ color: "#16bd49", fontSize: "20px" }}
                    />
                    <p>Bank Offer</p>
                    <span className="text">
                      5% off upto ₹25 on any prepaid instrument
                    </span>
                    <a href="./#">T&C</a>
                  </div>
                  <div className="offer-item">
                    <div style={{ margin: " 0  6px 0 0" }}>
                      <LocalOfferIcon
                        style={{ color: "#16bd49", fontSize: "20px" }}
                      />
                    </div>
                    <span className="text">
                      No Cost EMI on Flipkart Axis Bank Credit Card
                    </span>
                    <a href="./#">T&C</a>
                  </div>
                </div>
              </p>
              <p style={{ display: "flex" }}>
                <span
                  style={{
                    width: "100px",
                    fontSize: "14x",
                    color: "#878787",
                    fontWeight: "600",
                    display: "flex",
                    marginTop: "10px",
                  }}
                >
                  Delivery
                </span>
                <div>
                  <div>
                    <span className="input-delivery">
                      <LocationOnIcon />
                      <input
                        type="text"
                        placeholder="Enter Delivery Pincode"
                        style={{ border: "none", outline: "none" }}
                      />
                    </span>
                  </div>
                  <p style={{ fontSize: "14px", fontWeight: "600" }}>
                    Usually delivered in3 days?
                  </p>
                  <p className="text" style={{ fontSize: "14px" }}>
                    Enter pincode for exact delivery dates/charges
                  </p>
                </div>
              </p>
              <div className="super-coin">
                <img
                  src="https://rukminim1.flixcart.com/lockin/763/182/images/CCO__PP_2019-07-14.png?q=50"
                  alt=""
                  style={{ width: "381px" }}
                />
              </div>
              <p style={{ display: "flex" }}>
                <span
                  style={{
                    width: "100px",
                    fontSize: "15px",
                    color: "#878787",
                    fontWeight: "600",
                    marginRight: "20px",
                  }}
                >
                  Description
                </span>
                <span
                  style={{
                    fontSize: "14px",
                    color: "#212121",
                  }}
                >
                  {product.productDetails.description}
                </span>
              </p>
            </div>
            <Comment comment={comment} productId={productId} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetailsPage;
