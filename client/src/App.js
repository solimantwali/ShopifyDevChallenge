import './App.css';

import Uploader from './components/Uploader';
import { red, blue, green } from '@mui/material/colors';
//import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import themeOptions from './themeOptions';
import NavBar from './components/NavBar';
import ViewAll from './components/ViewAll';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

//const theme = createTheme(themeOptions);
const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: blue[500],
    },
    secondary: {
      main: green[600],
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Uploader />
    </ThemeProvider>
  );
}

// function App() {
//   const [listOfItems, setListOfItems] = useState([]);
//   const [itemName, setItemName] = useState("");
//   const [itemQuantity, setItemQuantity] = useState(0);
//   const [itemCode, setItemCode] = useState("");

//   //useEffect runs immediately when website loads

//   useEffect(() => {
//     Axios.get("http://localhost:3001/getItems").then((response) => {
//       setListOfItems(response.data);
//     });
//   }, []);

//   const createItem = () => {
//     Axios.post("http://localhost:3001/createItem", {
//       name: itemName,
//       quantity: itemQuantity,
//       itemcode: itemCode,
//     }).then((response) => {
//       setListOfItems([
//         ...listOfItems,
//         {
//           name: itemName,
//           quantity: itemQuantity,
//           itemcode: itemCode,
//         },
//       ]);
//       alert("Item created");
//     });
//   };

//   return (
//     <div className="App">
//       <Pane display="flex" padding={16} background="tint2" borderRadius={3}>
//         <Pane flex={1} alignItems="center" display="flex">
//           <Heading size={600}>
//             Shopify Developer Intern Challenge 2022 - Soliman Ali
//           </Heading>
//         </Pane>
//         <Pane>
//           {/* Below you can see the marginRight property on a Button. */}
//           <Button marginRight={16}>Button1</Button>
//           <Button appearance="primary">Button2</Button>
//         </Pane>
//       </Pane>

//       <Pane
//         display="flex"
//         padding={16}
//         background="tint2"
//         borderRadius={3}
//         marginTop={8}
//       >
//         <Pane
//           flex={1}
//           alignItems="center"
//           display="flex"
//           justifyContent="center"
//         >
//           <form
//             action="http://localhost:3001/upload"
//             method="POST"
//             enctype="multipart/form-data"
//           >
//             <div class="custom-file mb-3">
//               <input
//                 type="file"
//                 name="file"
//                 id="file"
//                 class="custom-file-input"
//               />
//               <label for="file" class="custom-file-label">
//                 Choose File
//               </label>
//             </div>
//             <input
//               type="submit"
//               value="Submit"
//               class="btn btn-primary btn-block"
//             />
//           </form>
//         </Pane>
//       </Pane>

//       <div className="itemsDisplay">
//         {listOfItems.map((item) => {
//           return (
//             <div>
//               <h1>Name: {item.name}</h1>
//               <h1>Quantity: {item.quantity}</h1>
//               <h1>Item Code: {item.itemcode}</h1>
//             </div>
//           );
//         })}
//       </div>
//       <div>
//         <input
//           type="text"
//           placeholder="Item Name..."
//           onChange={(event) => {
//             setItemName(event.target.value);
//           }}
//         />
//         <input
//           type="text"
//           placeholder="Item Quantity..."
//           onChange={(event) => {
//             setItemQuantity(event.target.value);
//           }}
//         />
//         <input
//           type="text"
//           placeholder="Item Code..."
//           onChange={(event) => {
//             setItemCode(event.target.value);
//           }}
//         />
//         <button onClick={createItem}> Create Item</button>
//       </div>
//     </div>
//   );
// }

export default App;
