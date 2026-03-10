import { useState, useRef, useEffect } from "react";
import {
  getItems,
  setItems,
  deleteItems,
  updateItems,
} from "../shop_services/shopservices";
import "../css/ShopCart.css";


function ShopCart() {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [result, setResult] = useState();
  const quantity = useRef(6);
  const [refersh, setref] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const numbers = useRef([]);
 const [titles,setTitle] = useState("")
  const [description,setDescription] = useState("")
  useEffect(() => {
    getCartItems();
  }, [refersh]);

  async function getCartItems(i, size) {
    console.log(i, size);
    const res = await getItems({ i, size });
    setResult(res.data.content);
    setTotalPages(res.data.totalPages);
  }
  useEffect(() => {
    numbers.current = Array.from({ length: totalPages }, (_, i) => i + 1);
    console.log(numbers.current.length);
  }, [totalPages]);

  async function setCartItems() {
    await setItems({
      title: titles,
      description: description,
      completed: false,
    });
    quantity.current++;
    setTitle("");
    setDescription("");
    setref(!refersh);
  }

  async function deleteItem(id) {
    await deleteItems(id);
    setref(!refersh);
  }

  async function updateItem(id) {
    await updateItems(id, {
      title: titles,
      description: description,
      completed: false,
    });
    setref(!refersh);
  }

  return (
    <>
      {/* <div>
        <button onClick={() => getCartItems(page,size)}>CLick here</button>
      </div> */}
      <div className="cart-container">
        <div className="add-section">
          <input type="text" label-id="titles" value={titles} onChange={(e) => setTitle(e.target.value)}/>
          <input type="text" label-id = "description" value = {description} onChange={(e) => setDescription(e.target.value)}/>
          <button className="add-btn" onClick={() => setCartItems()}>
            Add To Cart
          </button>
        </div>

        <h3>List of Cart Items</h3>

        <ul className="cart-list">
          {result
            ? result.map((r) => (
                <li key={r.id} className="cart-item">
                  <span className="item-title">{r.title}</span>
                  <span className="item-title">{r.description}</span>

                  <div className="actions">
                    <button
                      className="update-btn"
                      onClick={() => updateItem(r.id)}
                    >
                      Update
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => deleteItem(r.id)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))
            : "click button to get items"}
        </ul>

        <div className="pagination">
          {numbers.current.map((i) => (
            <button key={i} onClick={() => getCartItems(i, size)}>
              {i}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default ShopCart;
