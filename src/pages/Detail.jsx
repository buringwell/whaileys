import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const ambilProduct = async () => {
    const response = await axios.get("https://dummyjson.com/product/" + id);
    const data = await response.data;
    setProduct(data);
  };

  useEffect(() => {
    ambilProduct();
  }, []);

  console.log(product);

  return (
    <div>
      <img src={product?.thumbnail} alt="" />
      <h1>{product?.title}</h1>
    </div>
  );
};

export default Detail;
