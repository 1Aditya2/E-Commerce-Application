import React, { useEffect, useState } from "react";
import Hero from "../../Components/Hero/Hero";
import "./Home.scss";
import Category from "../../Components/Category/Category";
import Products from "../../Components/Products/Products";
import { axiosClient } from "../../utils/axiosClient";
import { useSelector } from "react-redux";
// import axios from 'axios'
function Home() {
  const categories = useSelector((state) => state.categoryReducer.categories);
  let newCat=[]
  for(let i=2;i<5;i++){
    newCat.push(categories[i])
  }
  const [topProducts, setTopProducts] = useState(null);
  const f=true;
  async function fetchData() {
    try {
      
      const topPicks=await axiosClient.get('products?filters[isTopPick][$eq]=true&populate=image')
      
      setTopProducts(topPicks.data.data)
      console.log(topPicks.data.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="Home">
      <Hero />
      <section className="collection container">
        <div className="info">
          <h2 className="heading">Shop By Categories</h2>
          <p className="subheading">
            Shop from the best, our Film and TV Posters.
          </p>
        </div>
        <div className="content">
          {/* <Category/> */}
          {newCat?.map(category=><Category key={category.id} cat={category}/>)}
        </div>
      </section>

      <section className="collection container">
        <div className="info">
          <h2 className="heading">Our Top Picks</h2>
          <p className="subheading">All New Designs, Same Old Details</p>
        </div>
        <div className="content">
        
          {/* <Products/> */}
          {topProducts?.map(pro=><Products key={pro.id} products={pro}/>)}
        </div>
      </section>
    </div>
  );
}

export default Home;
