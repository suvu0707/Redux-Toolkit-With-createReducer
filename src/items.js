import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems, addItems, deleteItem } from "./reducer";

const Items = () => {
  const dispatch = useDispatch();
  const { loading, items, error } = useSelector((state) => state.post);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [details, setDetails] = useState("");
  const [qty, setQty] = useState("");
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const saveItemData = () => {
    dispatch(addItems({ name, price, details, qty, photo }));
  };

  const deleteItemData = (id) => {
    dispatch(deleteItem(id));
  };

  return (
    <div>
      <input
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <input
        placeholder="Enter Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <br />
      <input
        placeholder="Enter Photo"
        value={photo}
        onChange={(e) => setPhoto(e.target.value)}
      />
      <br />
      <input
        placeholder="Enter Details"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
      />
      <br />
      <input
        placeholder="Enter Quantity"
        value={qty}
        onChange={(e) => setQty(e.target.value)}
      />
      <br />
      <br />
      <button onClick={saveItemData}>Save</button>
      <br />
      <br />
      {items.map((item, index) => (
        <p key={item.id}>
          {item.name}
          <button onClick={() => deleteItemData(item.id)}>Delete</button>
        </p>
      ))}
    </div>
  );
};

export default Items;
