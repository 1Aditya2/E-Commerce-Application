import React, { useState } from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import Cart from "../Cart/Cart";
import { useSelector } from "react-redux";
import List from "../List/List";
function Navbar() {
  const [input,setinput]=useState('');
  const [openCart, setopenCart] = useState(false);
  const categories = useSelector((state) => state.categoryReducer.categories);
  let newCat=[]
  for(let i=0;i<3;i++){
    newCat.push(categories[i])
  }
  // console.log(newCat);
  const cart=useSelector(state=>state.cartReducer.cart)
  let totalItems=0
  cart.forEach(item => {
    totalItems+=item.quantity
  });
  function handleClick(e){
    const xyz=document.getElementById('xyz');
    if(xyz.classList.contains('magic')){
      xyz.classList.remove('magic')
    }
    else{
      xyz.classList.add('magic')
    }
    setinput('')
    // console.log(xyz);
    // console.log(e.target.value);
  }
  function handleChange(e){
    let temp=e.target.value.toUpperCase()
    // console.log(temp);
    setinput(temp)
  }

  return (
    <>
      <div className="Navbar">
        <div className="nav-container container">
          <div className="nav-left">
            <ul className="link-group">
              {newCat?.map((category) => {
                return (
                  <li className="hover-link" key={category?.id}>
                    <Link className="link" to={`category/${category?.attributes
?.key}`}>
                      {category?.attributes?.title}
                    </Link>
                  </li>
                );
              })}
              
            </ul>
          </div>
          <div className="nav-center">
            <Link to="/">
              <h1 className="banner">Posterz.</h1>
            </Link>
          </div>
          <div className="nav-search">
            <input type="text" placeholder="search any product here..." onClick={handleClick} id="abc" onChange={handleChange}/>
            <List search={input}/>
          </div>
          <div className="nav-right">
            <div
              className="nav-cart hover-link"
              onClick={() => {
                setopenCart(!openCart);
              }}
            >
              <BsCart3 className="icon" />
              {totalItems>0 && <span className="cart-count center">{totalItems}</span>}
              
            </div>
          </div>
        </div>
      </div>
      {openCart && (
        <Cart
          onClose={() => {
            setopenCart(false);
          }}
        />
      )}
    </>
  );
}

export default Navbar;
