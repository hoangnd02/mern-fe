import axios from "../helpers/axios";
import { productConstants } from "./constants";

export const getProductsBySlug = (slug) => {
  console.log(slug);
  return async (dispatch) => {
    const res = await axios.get(`initialData`);
    console.log(res);
    const { products, productsByPrice } = res.data;

    if (res.status === 200) {
      dispatch({
        type: productConstants.GET_PRODUCTS_BY_SLUG,
        payload: { products, productsByPrice },
      });
    } else {
    }
  };
};

export const getProductPage = (payload) => {
  return async (dispatch) => {
    try {
      const { cid, type } = payload.params;
      const res = await axios.get(`/${cid}/${type}`);
      dispatch({
        type: productConstants.GET_PRODUCT_PAGE_REQUEST,
      });
      if (res.status == 200) {
        const { page } = res.data;
        dispatch({
          type: productConstants.GET_PRODUCT_PAGE_SUCCESS,
          payload: { page },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: productConstants.GET_PRODUCT_PAGE_FAILURE,
          payload: {
            error: { error },
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getProductDetailsById = (payload) => {
  return async (dispatch) => {
    dispatch({ type: productConstants.GET_PRODUCT_DETAILS_BY_ID_REQUEST });
    let res;
    try {
      const { productId } = payload.params;
      res = await axios.post(`/product/${productId}`);
      dispatch({
        type: productConstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS,
        payload: { productDetails: res.data.product },
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: productConstants.GET_PRODUCT_DETAILS_BY_ID_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};
