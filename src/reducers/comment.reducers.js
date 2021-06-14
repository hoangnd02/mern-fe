import { commentConstants, userConstants } from "../actions/constants";

const initState = {
  comment: {},
  error: null,
  loading: false,
};

export default (state = initState, action) => {
  console.log(action);
  switch (action.type) {
    case commentConstants.GET_COMMENT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case commentConstants.GET_COMMENT_SUCCESS:
      state = {
        ...state,
        comment: {
          ...state.comment,
          [action.payload.productId]: action.payload.comment,
        },
        loading: false,
      };
      break;
    case commentConstants.GET_COMMENT_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
  }

  return state;
};
