import React, { useEffect, useMemo } from "react";
import "./List.scss";
import { Link } from "react-router-dom";
import { debounce } from "../../utils/helper";
import { useSelector } from "react-redux";
function List({ searchItem = '', fetchData }) {
  const products = useSelector((state) => state.productReducer.products);

  const debouncedSearch = useMemo((e) => debounce(2000, (search) => fetchData(search)), []);

  useEffect(() => {
    if (searchItem) {
      debouncedSearch(searchItem);
    }
  }, [searchItem, debouncedSearch]);

  return (
    <div className="list magic" id="xyz">
      <ul>
        {products?.map((prod) => {
          return (
            <Link
              className="l"
              key={prod?.id}
              to={`/products/${prod?.attributes?.key}`}
            >
              <li>{prod?.attributes?.title}</li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}

export default List;
