import React from "react";
import "./Category.scss";
import { useNavigate } from "react-router-dom";
function Category({ cat }) {
  const navigate = useNavigate();
  return (
    <div
      className="Category"
      style={{
        backgroundImage: `url(${cat.attributes.image.data.attributes.url})`,
      }}
      onClick={() => {
        navigate(`/category/${cat?.attributes?.key}`);
      }}
    >
      <div className="category-content center">
        <h3 className="heading">{cat?.attributes?.title}</h3>
      </div>
    </div>
  );
}

export default Category;
