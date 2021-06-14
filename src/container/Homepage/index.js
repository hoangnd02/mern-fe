import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProductsBySlug } from "../../actions/product.action";
import Layout from "../../Component/Layout";
import Card from "../../Component/UI/Card";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./style.css";
import { Carousel as Carousels } from "react-responsive-carousel";
import { MaterialButton } from "../../Component/MaterialUI";
import Product from "../../Component/Product";

// Import Swiper
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
// import Swiper core and required modules
import SwiperCore, { Navigation } from "swiper/core";
// install Swiper modules
SwiperCore.use([Navigation]);

const HomePage = (props) => {
  const dispatch = useDispatch();
  let product = useSelector((state) => state.product);
  const { match } = props;

  useEffect(() => {
    dispatch(getProductsBySlug(match.params.slug));
  }, []);

  const banners = [
    {
      img: "https://cf.shopee.vn/file/3fcbe1e9ee4887e0b83c77652ae0861d_xxhdpi",
    },
    {
      img: "https://cf.shopee.vn/file/de12358e35ed3dac0e03c870ce99e6d3_xxhdpi",
    },
    {
      img: "https://cf.shopee.vn/file/8c299ae1406de4edc6174b39e22d701b_xxhdpi",
    },
  ];

  return (
    <Layout>
      <div className="slides">
        <Carousels renderThumbs={() => {}} autoPlay infiniteLoop showIndicators>
          {banners.map((banner, index) => (
            <Link
              key={index}
              style={{ display: "block" }}
              to={banner.navigateTo}
            >
              <img src={banner.img} alt="" />
            </Link>
          ))}
        </Carousels>
      </div>
      <Card
        headerLeft={`Mobiles`}
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
        <div style={{ display: "flex" }}>
          <Swiper
            breakpoints={{
              // when window width is >= 640px
              640: {
                width: 640,
                slidesPerView: 1,
              },
              // when window width is >= 768px
              768: {
                width: 768,
                slidesPerView: 3,
              },
              // when window width is >= 1100px
              1100: {
                width: 1329,
                slidesPerView: 6,
              },
            }}
            navigation={true}
            className="mySwiper"
          >
            {product &&
              product.products.map((product, index) => (
                <SwiperSlide>
                  <Product product={product} index={index} />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </Card>
      <Card
        headerLeft={`Mobiles`}
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
        <div style={{ display: "flex" }}>
          <Swiper
            breakpoints={{
              // when window width is >= 640px
              640: {
                width: 640,
                slidesPerView: 1,
              },
              // when window width is >= 768px
              768: {
                width: 768,
                slidesPerView: 3,
              },
              // when window width is >= 1100px
              1100: {
                width: 1329,
                slidesPerView: 6,
              },
            }}
            navigation={true}
            className="mySwiper"
          >
            {product &&
              product.products.map((product, index) => (
                <SwiperSlide>
                  <Product product={product} index={index} />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </Card>
    </Layout>
  );
};

export default HomePage;
