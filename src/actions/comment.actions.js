import axios from "../helpers/axios";
import { commentConstants } from "./constants";

export const getAllComments = (productId) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`/getAllComments/${productId}`);
      dispatch({ type: commentConstants.GET_COMMENT_REQUEST });
      if (res.status === 200) {
        const { comment } = res.data;
        dispatch({
          type: commentConstants.GET_COMMENT_SUCCESS,
          payload: { productId, comment },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: commentConstants.GET_COMMENT_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addComment = (form, productId) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`/comment/${productId}`, form);
      console.log(res);
      // if (res.status === 200) {
      //   const { comment } = res.data;
      //   dispatch({
      //     type: commentConstants.GET_COMMENT_SUCCESS,
      //     payload: { productId, comment },
      //   });
      // } else {
      //   const { error } = res.data;
      //   dispatch({
      //     type: commentConstants.GET_COMMENT_FAILURE,
      //     payload: { error },
      //   });
      // }
    } catch (error) {
      console.log(error);
    }
  };
};
