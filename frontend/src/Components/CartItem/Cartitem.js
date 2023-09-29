import React from "react";

import "./Cartitem.scss";
import { AiOutlineClose } from "react-icons/ai";
import {
  addToCart,
  removeCartItems,
  removeFromCart,
} from "../../Redux/cartSlice";
import { useDispatch } from "react-redux";
function Cartitem({ cart }) {
  const dispatch = useDispatch();
  return (
    <div className="Cartitem">
      <div className="item-img">
        <img src={cart.image} alt="" />
      </div>
      <div className="item-info-wrapper">
        <div className="item-info">
          <p className="title">{cart.title}</p>
          <p className="price">Rs {cart.price}</p>
          <div className="quantity-selector">
            <span
              className="btn decrement"
              onClick={() => {
                dispatch(removeFromCart(cart));
              }}
            >
              -
            </span>
            <span className="quantity">{cart.quantity}</span>
            <span
              className="btn increment"
              onClick={() => {
                dispatch(addToCart(cart));
              }}
            >
              +
            </span>
          </div>
          <p className="total-price">
            Subtotal:Rs {cart?.quantity * cart?.price}
          </p>
        </div>
        <div className="item-remove">
          <AiOutlineClose
            onClick={() => {
              dispatch(removeCartItems(cart));
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Cartitem;
