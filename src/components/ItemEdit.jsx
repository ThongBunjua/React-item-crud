import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ItemEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const nameRef = useRef();
  const categoryRef = useRef();
  const priceRef = useRef();
  const statusRef = useRef();

  useEffect(() => {
    const loadItem = async () => {
      const res = await fetch(`/api/item/${id}`);
      const data = await res.json();
      if (nameRef.current) nameRef.current.value = data.itemName;
      if (categoryRef.current) categoryRef.current.value = data.itemCategory;
      if (priceRef.current) priceRef.current.value = data.itemPrice;
      if (statusRef.current) statusRef.current.value = data.status;
    };
    loadItem();
  }, [id]);

  const handleUpdate = async () => {
    const body = {
      itemName: nameRef.current.value,
      itemCategory: categoryRef.current.value,
      itemPrice: priceRef.current.value,
      status: statusRef.current.value
    };

    await fetch(`/api/item/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    alert("Updated!");
    navigate("/");
  };

  return (
    <div>
      <h1>Edit Item</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input ref={nameRef} placeholder="Name" />
        <input ref={categoryRef} placeholder="Category" />
        <input ref={priceRef} type="number" placeholder="Price" />
        <select ref={statusRef}>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <div style={{ marginTop: '20px' }}>
          <button onClick={handleUpdate}>Save Changes</button>
          <button onClick={() => navigate("/")} style={{ marginLeft: '10px', background: 'gray' }}>Cancel</button>
        </div>
      </div>
    </div>
  );
}