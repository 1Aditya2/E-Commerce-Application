import React from 'react'
import './ProductPreview.scss'
import { getImageUrl } from '../../utils/imageUtils'
import { cancelClickDefault, capsFirst } from '../../utils/helper'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../Redux/cartSlice'
import { useNavigate } from 'react-router-dom'

const ProductPreview = ({ product, popUpPosition }) => {
    const navigate = useNavigate();
    const image = getImageUrl(product?.attributes?.image);
    const dispatch = useDispatch();
    return (
        <div className="mini-preview" onClick={cancelClickDefault} style={{
            position: 'absolute',
            left: popUpPosition.left,
            top: popUpPosition.top
        }}>
            <div className="img-container">
                <img
                    src={image}
                    alt=""
                    id="img"
                />
            </div>
            <div className="product-info">
                <p className="title">{capsFirst(product?.attributes?.title)}</p>
                <p className="price">₹{product?.attributes?.price}</p>
                <p className="description">{capsFirst(product?.attributes?.desc)}</p>
                <div className='btn-group'>
                    <button
                        className="btn-primary add-to-cart"
                        onClick={() => {
                            dispatch(addToCart(product));
                        }}
                    >
                        Add To Cart
                    </button>
                    <button
                        className="btn-secondary"
                        onClick={() => {
                            navigate(`/products/${product?.attributes?.key}`);
                        }}
                    >
                        View Details
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductPreview