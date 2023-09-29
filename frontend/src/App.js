import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCategories } from "./Redux/categorySlice";
import Collection from "./Pages/Collection/Collection";
import Payments from "./Components/Payments/Payments";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:categoryID?" element={<Collection />} />
        <Route path="/products/:productID" element={<ProductDetail />} />
        <Route path="/payments/:status" element={<Payments />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
