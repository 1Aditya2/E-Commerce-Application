import React, { useEffect, useState } from "react";
// import naruto from "../../assets/naruto.jpeg";
import "./ProductDetail.scss";
import { useParams } from "react-router-dom";
import { axiosClient } from "../../utils/axiosClient";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../Redux/cartSlice";
function ProductDetail() {
  const dispatch=useDispatch();
  const params=useParams();
  const key=params.productID;
  const [Product,setProduct]=useState(null);
  const cart=useSelector(state=>state.cartReducer.cart)
  const quantity=cart?.find(item=>item.key===key)?.quantity || 0

  async function fetchData(){
    const resp=await axiosClient.get(`/products?filters[key][$eq]=${key}&populate=image`)
    if(resp.data.data.length>0){
      setProduct(resp.data.data[0])
    }
    // console.log(resp);
  }
  useEffect(()=>{
    setProduct(null)
    fetchData()
  },[params])

  // console.log(params);

  return (
    <div className="ProductDetail">
      <div className="container">
        <div className="product-layout">
          <div className="product-img center">
            <div className="img-container">
              <img  src={Product?.attributes?.image?.data?.attributes.url} alt="sd"/>
            </div>
          </div>
          <div className="product-info">
            <h1 className="heading">{Product?.attributes?.title}</h1>
            <h3 className="price">₹{Product?.attributes?.price}</h3>
            <p className="description">
              {Product?.attributes?.desc}
            </p>
            <div className="cart-options">
              <div className="quantity-selector">
                <span className="btn decrement" onClick={()=>{dispatch(removeFromCart(Product))}}>-</span>
                <span className="quantity">{quantity}</span>
                <span className="btn increment" onClick={()=>{dispatch(addToCart(Product))}}>+</span>
              </div>
              <button className="btn-primary add-to-cart" onClick={()=>{dispatch(addToCart(Product))}}>Add To Cart</button>
            </div>
            <div className="return-policy">
              <ul>
                <li>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Rerum, vero!
                </li>
                <li>Lorem ipsum dolor sit amet.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
