import React, { useEffect, useState } from "react";
import "./ProductDetail.scss";
import { useParams } from "react-router-dom";
import { axiosClient } from "../../utils/axiosClient";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../Redux/cartSlice";
function ProductDetail() {
  const dispatch = useDispatch();
  const params = useParams();
  const key = params.productID;
  const [Product, setProduct] = useState(null);
  const cart = useSelector((state) => state.cartReducer.cart);
  const quantity = cart?.find((item) => item.key === key)?.quantity || 0;

  async function fetchData() {
    const resp = await axiosClient.get(
      `/products?filters[key][$eq]=${key}&populate=image`
    );
    if (resp.data.data.length > 0) {
      setProduct(resp.data.data[0]);
    }
  }
  useEffect(() => {
    setProduct(null);
    fetchData();
  }, [params]);

  return (
    <div className="ProductDetail">
      <div className="container">
        <div className="product-layout">
          <div className="product-img center">
            <div className="img-container">
              <img
                src={Product?.attributes?.image?.data?.attributes.url}
                alt="sd"
              />
            </div>
          </div>
          <div className="product-info">
            <h1 className="heading">{Product?.attributes?.title}</h1>
            <h3 className="price">₹{Product?.attributes?.price}</h3>
            <p className="description">{Product?.attributes?.desc}</p>
            <div className="cart-options">
              <div className="quantity-selector">
                <span
                  className="btn decrement"
                  onClick={() => {
                    dispatch(removeFromCart(Product));
                  }}
                >
                  -
                </span>
                <span className="quantity">{quantity}</span>
                <span
                  className="btn increment"
                  onClick={() => {
                    dispatch(addToCart(Product));
                  }}
                >
                  +
                </span>
              </div>
              <button
                className="btn-primary add-to-cart"
                onClick={() => {
                  dispatch(addToCart(Product));
                }}
              >
                Add To Cart
              </button>
            </div>
            <div className="return-policy">
              <ul>
                <li>
                  At Posterz., our aim is to provide 100% satisfaction to our
                  customers. If for any reason you are not satisfied with the
                  product, we are here to help. Please Exchange your purchase in
                  its original packaging with all the parts and freebies with
                  your original receipt for a replacement. Please make sure that
                  the product(s) are properly packed when you are returning it.
                </li>
                <li>
                  If any or all the products that were originally part of an
                  order placed using a coupon or offer are returned then the
                  coupon code/offer will no longer be applicable on the order.
                  The benefit of the coupon/offer will also not be included in
                  the refund. If the product(s) returned are part of any free
                  offer such as Buy 2 get 1 free or Buy 1 get 1 free, all the
                  products related to the offer have to be returned, as they
                  have been purchased as part of a group offer, failing which
                  the refund would not be processed unless we get all products
                  in one.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
