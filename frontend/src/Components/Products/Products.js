import React, { useState } from "react";
import "./Products.scss";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../../utils/imageUtils";
import ProductPreview from "../ProductPreview/ProductPreview";
import { capsFirst } from "../../utils/helper";

function Products({ product }) {
  const navigate = useNavigate();
  const [hover, setHover] = useState(null);
  const [rect, setRect] = useState(null);

  const handleMouseEnter = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = window.innerWidth;
    const height = window.innerHeight;
    const x = event.clientX;
    const y = event.clientY;
    let relativeX = event.clientX - rect.left;
    let relativeY = event.clientY - rect.top; 
    if (x + 400 > width) {
      relativeX = relativeX - (x + 412 - width);
    }
    if (y + 400 > height) {
      relativeY = relativeY - (y + 412 - height);
    }
    setRect({ left: relativeX, top: relativeY });
    setHover(product?.id);
  };

  const handleMouseLeave = () => {
    setRect(null);
    setHover(null);
  }
  return (
    <div
      className="Product"
      onClick={() => {
        navigate(`/products/${product?.attributes?.key}`);
      }}
      
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="product-container">
        <div className="product-img">
          <div className="img-container">
            <img
              src={getImageUrl(product?.attributes?.image)}
              alt=""
              id="img"
            />
          </div>
        </div>
        <div className="product-info">
          <p className="title">{capsFirst(product?.attributes?.title)}</p>
          <p className="price">₹{product?.attributes?.price}</p>
        </div>
      </div>
      {hover === product?.id && <ProductPreview product={product} popUpPosition={rect}/>}
    </div>
  );
}

export default Products;
