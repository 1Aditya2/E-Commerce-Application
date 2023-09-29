import React, { useEffect, useState } from "react";
import "./List.scss";
import { axiosClient } from "../../utils/axiosClient";
import { Link } from "react-router-dom";
function List(props) {
  const [Products, setProducts] = useState([]);
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axiosClient.get(
        "/products?pagination[page]=1&pagination[pageSize]=31"
      );

      setProducts(response?.data?.data);
      setFilterData(response?.data?.data);
    }
    fetchData();
  }, []);
  useEffect(() => {
    let temp = Products?.filter((prod) => {
      if (props.search === "") {
        return prod;
      } else {
        let ans = prod?.attributes?.title.toUpperCase();

        if (ans.includes(props.search)) {
          return prod;
        }
      }
    });

    setFilterData(temp);
  }, [props.search]);

  return (
    <div className="list magic" id="xyz">
      <ul>
        {filterData?.map((prod) => {
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
