import React from 'react'
import './Products.scss'
// import naruto from '../../assets/naruto.jpeg'
import { useNavigate } from 'react-router-dom'

function Products({products}) {
  // console.log(products.attributes.image.data.attributes.formats.thumbnail.url);
  
  const navigate=useNavigate();
  return (
    <div className='Product' onClick={()=>{navigate(`/products/${products?.attributes?.key}`)}}>
      <div className="product-container">
        <div className="product-img">
          <div className="img-container">
            <img src={products?.attributes?.image.data.attributes.url} alt="" id='img'/>
          </div>
        </div>
        <div className="product-info">
          <p className='title'>{products?.attributes?.title}</p>
          <p className='price'>₹{products?.attributes?.price}</p>
        </div>
      </div>

    </div>
  )
}

export default Products