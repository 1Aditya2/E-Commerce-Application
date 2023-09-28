import React from "react";
import "./Cart.scss";
import { AiOutlineClose } from "react-icons/ai";
import {axiosClient} from "../../utils/axiosClient";
import Cartitem from "../CartItem/Cartitem";
import { useSelector } from "react-redux";
import { BsCartX } from "react-icons/bs";
import {loadStripe} from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51NjhFNSBXrfcHQb7RCNo6htVWmMQQiobvuxqT4KFrKqdQCxpkQV5jnVmC5kmMTjsmFjBhciYFH5jZElU1M7CnUpJ00tfA9AAuI');
function Cart({ onClose }) {
  const cart=useSelector(state=>state.cartReducer.cart)
  let totalQuant=0
  cart?.forEach(item => {
    totalQuant+=item.quantity*item.price
  });
  const isCartEmpty=cart.length===0


  async function handleCheckOut(){
    const res=await axiosClient.post('/orders',{
      Products:cart
    })

    const stripe=await stripePromise
    await stripe.redirectToCheckout({
      sessionId:res.data.stripeId

    })

    // console.log(res,'response');
  }

  return (
    <div className="Cart">
      <div className="overlay" onClick={()=>{onClose()}}></div>
      <div className="cart-content">
        <div className="header">
          <h3>Shopping Cart</h3>
          <div className="close-btn" onClick={()=>{onClose()}}>
            <AiOutlineClose />
          </div>
        </div>
        <div className="cart-item">
        {cart.map(item=><Cartitem cart={item}/>)}
        
        </div>
        {isCartEmpty && <div className="empty-cart-info">
          <div className="icon"><BsCartX/></div>
          <h4>Cart is Empty</h4>
        </div>}
        {!isCartEmpty && <div className="checkout-info">
          <div className="total-amount">
            <h3 className="total-message">Total</h3>
            <h3 className="total-amount">Rs {totalQuant}</h3>
          </div>
          <div className="checkout btn-primary" onClick={handleCheckOut}>Checkout Now</div>
        </div>}
        
        
        
      </div>
    </div>
  );
}

export default Cart;
