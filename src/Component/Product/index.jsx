import React from "react";
import { BiRupee } from "react-icons/bi";
import { IoIosStar } from "react-icons/io";
import { Link } from "react-router-dom";
import { generatePublicUrl } from "../../urlConfig";
import "./style.css";
const Product = ({ product, index, maxwidth }) => {
    return (
        <Link
            to={`/${product.slug}/${product._id}`}
            style={{ display: "block" }}
            className={" productContainer " + maxwidth}
            key={index}
        >
            <div className="productImgContainer ">
                <img
                    src={generatePublicUrl(product.productPictures[0].img)}
                    alt=""
                />
                {/* <div className="bg-img"></div> */}
            </div>
            <div className="productInfo">
                <div className="productInfo-title">
                    Spigen Back Cover for Sam sung Galaxy A72
                </div>
                <div className="productInfo-container">
                    <span className="ratingCount">
                        4.3 <IoIosStar />
                    </span>
                    <span>(13534)</span>
                    <img
                        src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png"
                        alt=""
                        style={{ height: "20px", width: "auto" }}
                    />
                </div>
                {/* <div className="productPrice">{product.price}0000$</div> */}
                <div className="priceContainer">
                    <span className="price1">
                        <BiRupee />
                        {/* {product.productDetails.price} */}
                        555
                    </span>
                    <span className="pre-price">
                        <BiRupee />
                        {/* {product.productDetails.price * 1.22} */}555
                    </span>
                    <span className="discount" style={{ margin: "0 10px" }}>
                        22% off
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default Product;
