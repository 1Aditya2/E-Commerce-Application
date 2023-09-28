import React, { useEffect, useState } from "react";
import "./Collection.scss";
// import Products from "../../Components/Products/Products";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { axiosClient } from "../../utils/axiosClient";
import Products from "../../Components/Products/Products";
function Collection() {
  const navigate=useNavigate()
  const params=useParams()

  const [categoryId,setcategoryId]=useState('')
  const [products,setProducts]=useState(null)
  const categories = useSelector((state) => state.categoryReducer.categories);
  const [sortBy,setSortBy]=useState('price')
  async function fetchProducts(){
    const url=params.categoryID?`/products?populate=image&filters[category][key][$eq]=${params.categoryID}&sort=${sortBy}`:`/products?populate=image&sort=${sortBy}`
    const resp=await axiosClient.get(url)
    setProducts(resp.data.data,'resp at collection');
  }
  useEffect(()=>{
    setcategoryId(params.categoryID)
    fetchProducts()
  },[params,sortBy])

  const sortOptions=[{
    value:'Price-Low To High',
    sort:'price'
  },
  {
    value:'Newest First',
    sort:'updatedAt'
  },
  
]
function handleSortChange(e){
  // console.log(e.target.value);
  setSortBy(e.target.value)
}

  function handleChange(e){
    // console.log(e.target.value);
    navigate(`/category/${e.target.value}`)
  }
  return (
    <div className="Categories">
      <div className="container">
        <div className="header">
          <div className="info">
            <h2>Explore All Print and ArtWork</h2>
            <p>
              India's largest collection Lorem ipsum dolor sit amet consectetur
              adipisicing elit. In, facere.
            </p>
          </div>
          <div className="sort-by">
            <div className="sort-by-container">
              <h3 className="sort-by-text">Sort By</h3>
              <select className="select-sort-by" name="sort-by" id="sort-by" onChange={handleSortChange}>
                {sortOptions.map((op)=>{
                  return (
                    <option key={op.sort} value={op.sort}>{op.value}</option>
                  )
                })}
                {/* <option value="relevance">Relevance</option>
                <option value="newest-first">Newest First</option>
                <option value="price-lth">Price - Low To High</option> */}
              </select>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="filter-box">
            <div className="category-filter">
              <h3>Category</h3>
              
              {categories.map(item=>(
                <div className="filter-radio">
                <input type="radio" name="category" id={item?.id} onChange={handleChange} value={item?.attributes?.key} checked={item?.attributes?.key===categoryId}/>
                <label htmlFor={item.id}>{item.attributes.title}</label>
              </div>
              ))}
            </div>
          </div>
          <div className="products-box">
            {/* <Products/> */}
            {products?.map((product)=>{
              return (<Products products={product} key={product?.id}/>)
            })}
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Collection;
