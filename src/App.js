import logo from "./logo.svg";
import "./App.css";

import ShopCart from "./shopCart/ShopCart";
import { useState } from "react";
import Tasks_manager from "./tasks/Tasksmanager";


function App() {
  const [cart,setCart] = useState(false);
  function handleClick(){
    setCart(prev => !prev);
  }
return <>

  <button className= "add-btn" onClick={handleClick}>
    Cart Icon
  </button>
  {cart ? <ShopCart/> : <Tasks_manager/>}

</>


}


export default App;
