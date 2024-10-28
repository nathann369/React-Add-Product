import { useState, useEffect } from 'react'
import { toast } from "react-toastify";

import './App.css'

function App() {
 
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
 

  const [priceUpdate, setPriceUpdate] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch-Product-From_api
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/products/");
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };
  // Add-Product
  const addProduct = async () => {
    const productData = {
      product_name: productName,
      price,
      description,
    };
    try {
      const response = await fetch("http://127.0.0.1:8000/api/products/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });
      toast.success("Product added to cart");
      const data = await response.json();
      setProducts((prev) => [...prev, data]);
    } catch (err) {
      console.log(err);
    }
    toast.success("Product added to cart");
  };
  // Update-Product
  const updatePrice = async (pk, description, productName) => {
    const productData = {
      product_name: productName,
      price: priceUpdate,
      description,
      
    };
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/products/${pk}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();
      setProducts((prev) =>
        prev.map((product) => {
          if (product.id === pk) {
            return data;
          } else {
            return product;
          }
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  // Handle Feilds
  const handlePName = (e) => {
    setProductName(e.target.value);
  };

  // Delete-Product
  const deleteProduct = async (pk) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/products/${pk}`, {
        method: "DELETE",
      });

      setProducts((prev) => prev.filter((product) => product.id !== pk));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <h1>Novo-Mall</h1>
      <div>
          <input
            type="text"
            placeholder="Product Name..."
            onChange={handlePName}
          /><br/>
          <input
            type="number"
            placeholder="Price..."
            onChange={(e) => setPrice(e.target.value)}
          /><br/>
          <input
            type="text"
            placeholder="Description..."
            onChange={(e) => setDescription(e.target.value)}
          /><br/>
          <button onClick={addProduct}> Add Product </button>
        </div>


        {products.map((product) => (
        <div className='card' key={product.id}>
          <p>Item: {product.productName}</p>
          <p>Price: ₦{product.price} </p>
          <p>Description: {product.description} </p>

          <input
            type="number"
            key={product.id}
            placeholder={product.price}
            onChange={(e) => setPriceUpdate(e.target.value)}
          /><br/>
          {/* <input
            type="text"
            key={product.id}
            placeholder={product.description}
          /><br/> */}

          <button onClick={() => updatePrice(product.id, product.description, product.productName)}>
            Update
          </button>

          <br/>
          <button onClick={() => deleteProduct(product.id)}> Delete</button>
        </div>
      ))}




        {/* <div className='mt-5'>
          
          <table className='table'>
            
            <thead>
              <tr>
                  Products
              </tr>
            </thead>
            
            <tbody>
              {products.map((product) => 
                <tr>
                    <td>{product.productName}</td>
                    <td>{product.price}</td>
                    <td>{product.description}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div> */}
    </>
  )
}

export default App
