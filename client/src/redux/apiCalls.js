import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import {
  publicRequest,
  setAccesToken,
  userRequest,
} from "../utils/axiosInstanse";
import {
  updateCartStart,
  updateCartSuccess,
  updateCartFailure,
} from "./cartRedux";

export const login = async (dispatch, puser, pProducts) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", puser);
    const { user, accessToken } = res.data;
    dispatch(loginSuccess(user));
    setAccesToken(accessToken);
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const updateUserCart = async (dispatch, puser, pCart) => {
  dispatch(updateCartStart());
  try {
    let pCartid;
    let res;
    if (!pCart.cartId) {
      res = await userRequest.get(`/carts/find/${puser._id}`);
      pCartid = res.data.cart._id;
    } else pCartid = pCart.cartId;

    if (pCart.products.length == 0) {
      dispatch(updateCartSuccess({ ...res.data.cart, cartId: pCartid }));
    } else {
      await userRequest.put(`/carts/${puser._id}/${pCartid}`, {
        products: pCart.products,
        quantity: pCart.quantity,
        total: pCart.total,
      });
    }
  } catch (err) {
    dispatch(updateCartFailure());
  }
};
