import axios from "../helpers/axios";
import { productConstants } from "./constants";

export const getProductPage = (payload) => {
  return async (dispatch) => {
    const { cid, type } = payload;
    const res = await axios.get(`/page/${cid}/${type}`);
    if (res.status == 200) {
      const { page } = res.data;
      dispatch({
        type: productConstants.GET_PRODUCTS_BY_SLUG,
        payload: page,
      });
    } else {
      //   dispatch({
      //     type: productConstants.GET_ALL_CATEGORIES_FAILURE,
      //     payload: {
      //       error: res.data,
      //     },
      //   });
    }
  };
};
