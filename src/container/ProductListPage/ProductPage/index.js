import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductPage } from "../../../actions/product.action";
import getParams from "../../../utils/getParams";
import Card from "../../../Component/UI/Card/index.js";

const ProductPage = (props) => {
    const dispatch = useDispatch();
    const product = useSelector((state) => state.product);
    const { page } = product;

    useEffect(() => {
        const params = getParams(props.location.search);
        const payload = { params };

        dispatch(getProductPage(payload));
    }, []);
    return (
        <div style={{ margin: "0 10px" }}>
            <h3>{page.title}</h3>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    margin: "10px 0",
                }}
            >
                {page.products &&
                    page.products.map((product, index) => (
                        <Card
                            key={index}
                            style={{
                                width: "400px",
                                height: "200px",
                                margin: "5px",
                            }}
                        >
                            <img
                                style={{
                                    width: "100%",
                                    height: "100%",
                                }}
                                src={product.img}
                                alt=""
                            />
                        </Card>
                    ))}
            </div>
        </div>
    );
};

export default ProductPage;
