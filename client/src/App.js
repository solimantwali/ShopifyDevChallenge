import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [listOfItems, setListOfItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState(0);
  const [itemCode, setItemCode] = useState("");

  //useEffect runs immediately when website loads

  useEffect(() => {
    Axios.get("http://localhost:3001/getItems").then((response) => {
      setListOfItems(response.data);
    });
  }, []);

  const createItem = () => {
    Axios.post("http://localhost:3001/createItem", {
      name: itemName,
      quantity: itemQuantity,
      itemcode: itemCode,
    }).then((response) => {
      setListOfItems([
        ...listOfItems,
        {
          name: itemName,
          quantity: itemQuantity,
          itemcode: itemCode,
        },
      ]);
      alert("User created");
    });
  };

  return (
    <div className="App">
      <div className="itemsDisplay">
        {listOfItems.map((item) => {
          return (
            <div>
              <h1>Name: {item.name}</h1>
              <h1>Quantity: {item.quantity}</h1>
              <h1>Item Code: {item.itemcode}</h1>
            </div>
          );
        })}
      </div>
      <div>
        <input
          type="text"
          placeholder="Item Name..."
          onChange={(event) => {
            setItemName(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Item Quantity..."
          onChange={(event) => {
            setItemQuantity(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Item Code..."
          onChange={(event) => {
            setItemCode(event.target.value);
          }}
        />
        <button onClick={createItem}> Create Item</button>
      </div>
    </div>
  );
}

export default App;
