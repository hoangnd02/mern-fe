import { combineReducers } from "redux";
import categoryReducers from "./category.reducers";
import productReducers from "./product.reducers";
import authReducers from "./auth.reducers";
import cartReducers from "./cart.reducers";
import userReducers from "./user.reducers";
import commentReducers from "./comment.reducers";

const rootReducer = combineReducers({
  category: categoryReducers,
  product: productReducers,
  auth: authReducers,
  cart: cartReducers,
  user: userReducers,
  comment: commentReducers,
});

export default rootReducer;
