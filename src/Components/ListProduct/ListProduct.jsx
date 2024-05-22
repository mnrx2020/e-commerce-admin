import React, { useEffect, useState } from 'react';
import "./ListProduct.css";
import cross_icon from "../../assets/cross_icon.png";

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    const response = await fetch("https://mnrx-mern-e-commerce-backend-app-api.onrender.com/allproducts");
    const data = await response.json();
    const baseImageUrl = import.meta.env.VITE_APP_BACKEND_URL + '/images/';
    const modifiedProducts = data.map(product => ({
      ...product,
      image: baseImageUrl + product.image
    }));
    setAllProducts(modifiedProducts);
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct = async (id) => {
    await fetch("https://mnrx-mern-e-commerce-backend-app-api.onrender.com/removeproduct", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: id })
    });
    await fetchInfo();
  };

  return (
    <div className='list-product'>
      <h1>All Products List</h1>
      <div className='listproduct-format-main'>
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className='listproduct-allproducts'>
        <hr/>
        {allProducts.map((product, index) => (
          <div key={index} className='listproduct-format-main listproduct-format'>
            <img src={product.image} alt='' className='listproduct-product-icon' />
            <p>{product.name}</p>
            <p>${product.old_price}</p>
            <p>${product.new_price}</p>
            <p>{product.category}</p>
            <img onClick={() => removeProduct(product.id)} className='listproduct-remove-icon' src={cross_icon} alt='' />
            <hr/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;
