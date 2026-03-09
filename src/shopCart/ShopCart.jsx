import { useState, useRef, useEffect } from "react";
import { getItems, setItems, deleteItems } from "../shop_services/shopservices";
function ShopCart() {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [result, setResult] = useState();
  const quantity = useRef(6);
  const [refersh, setref] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const numbers = useRef([]);


  useEffect(() => {
    getCartItems();
  }, [refersh]);

  async function getCartItems(i,size) {
    console.log(i,size);
    const res = await getItems({i, size});
    setResult(res.data.content);
    setTotalPages(res.data.totalPages);
  }
 useEffect(() => {
    numbers.current = Array.from({ length: totalPages }, (_, i) => i + 1);
    console.log(numbers.current.length );
  }, [totalPages]);

  async function setCartItems() {
    await setItems({
      title: quantity.current,
      description: "description 1",
      completed: false,
    });
    quantity.current++;
    setref(!refersh);
  }

  async function deleteItem(id) {
    await deleteItems(id);
    setref(!refersh);
  }
  return (
    <>
      <div>
        <button onClick={() => getCartItems(page,size)}>CLick here</button>
      </div>
      <div>
        <button onClick={() => setCartItems()}>add to cart</button>
      </div>
      <div>
          <h3>List of all the Cart Items are</h3>
        {result
          ? result.map((r) => (
              <>

                <li>{r.title}</li>
                <div>
                  <button onClick={() => deleteItem(r.id)}>Remove</button>
                </div>
              </>
            ))
          : "click button to get items"}
      </div>

      {numbers.current.length > 0 ?
        <>
          {numbers && numbers.current.map((i) => (
            <button onClick={() => getCartItems(i, size)}>{i}</button>
          ))}
        </>
       :
        <>"0"</>
      }
    </>
  );
}

export default ShopCart;
