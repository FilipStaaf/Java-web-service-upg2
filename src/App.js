import "./App.css";
import { useEffect, useState } from "react";
//useCallback
function App() {

  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [token, setToken] = useState("");

  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
// products
  async function getProducts() {
  await fetch('http://localhost:8080/product/all',{
        method:"Get",
        headers:{
            "token": token
        }
    })
        .then(response => response.json())
        .then(data => {
            setProducts(data)
        });
}
useEffect(() => {
  getProducts();
},[]);

  return (
    <div className="App">
    
       <label>Username</label>
        <input
           value={username}
           onChange={(event) => setUserName(event.target.value)}
         /> 

      <label>Password</label>
         <input
           value={password}
           onChange={(event) => setPassword(event.target.value)}
         /> 

        <button
          onClick={() => {
            fetch("http://localhost:8080/user/register", {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },

              body: JSON.stringify({
                username: username,
                password: password,
              }),
            })
          }}
        >
          Register
        </button>
      
      <button 
       onClick={() => {
        fetch("http://localhost:8080/user/login", {
          method: "POST",
          headers: {
            username: username,
            password: password,
            
          },

        })  
        .then((response) => response.text())
        .then((data) => {
          console.log(data);
          setToken(data);
         // console.log(token);
        });
      }}
    >
     Login
    </button>


    <button 
       onClick={() => {
        getProducts();
        
       }}
    >
    
    Show all products
    </button>
    <h1>Products</h1>
      <div>
        <br />
        <ul>
          {products.map((product, index) => {
            return (
              <li key={index}>
                Name: {product.name} |  Description: {productDescription} | Price: {product.price} 
              </li>
            )
          })}
        </ul>
      </div>
      <div>
        <label>Namn</label>
        <input
          value={productName}
          onChange={(event) => setProductName(event.target.value)}
        />
        <br />
        <label>Beskrivning</label>
        <input
          value={productDescription}
          onChange={(event) => setProductDescription(event.target.value)}
        />
        <br />
        <label>Pris</label>
        <input
          value={productPrice}
          onChange={(event) => setProductPrice(event.target.value)}
        />
       
        <button
          onClick={() => {
            let price = Number.parseInt(productPrice);
            if (Number.isNaN(price)) {
              alert("Priset måste vara ett nummer.");
              return;
            }

            fetch("http://localhost:8080/product/create", {
              method: "PUT",

              headers: {
                "Content-Type": "application/json",
                "token": token
              },

              body: JSON.stringify({
                name: productName,
                description: productDescription,
                price: price,
              }),
            }).then((response) => {
              getProducts();
            });
          }}
        >
          Skapa Produkt
        </button>
      </div>
    </div>
  );
}

export default App;
