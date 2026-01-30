import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function ItemList() {
  const API_URL = "http://localhost:3000/api/item";
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const nameRef = useRef();
  const categoryRef = useRef();
  const priceRef = useRef();
  const statusRef = useRef();

  const loadItems = async (pageNum) => {
    try {
      const res = await fetch(`${API_URL}?page=${pageNum}`);
      if (!res.ok) throw new Error("Server Error");
      const data = await res.json();
      setItems(data.items || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error("Error:", err);
      setItems([]);
    }
  };

  useEffect(() => {
    loadItems(page);
  }, [page]);

  const handleSave = async () => {
    const body = {
      itemName: nameRef.current.value,
      itemCategory: categoryRef.current.value,
      itemPrice: priceRef.current.value,
      status: statusRef.current.value
    };

    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    
    nameRef.current.value = "";
    categoryRef.current.value = "";
    priceRef.current.value = "";
    loadItems(page);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    loadItems(page);
  };

  return (
    <div>
      <h1>Item List (Page {page})</h1>
      <table border="1" cellPadding="10" style={{ width: '100%', marginBottom: '20px', borderColor: '#444' }}>
        <thead>
          <tr style={{ background: '#333' }}>
            <th>Name</th><th>Category</th><th>Price</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>{item.itemName}</td>
              <td>{item.itemCategory}</td>
              <td>{item.itemPrice}</td>
              <td>{item.status}</td>
              <td>
                <Link to={`/item/${item._id}`}>
                  <button style={{ marginRight: '5px', cursor: 'pointer' }}>Edit</button>
                </Link>
                <button onClick={() => handleDelete(item._id)} style={{ background: '#ff4444', color: 'white', cursor: 'pointer' }}>Delete</button>
              </td>
            </tr>
          ))}
          <tr style={{ background: '#444' }}>
            <td><input ref={nameRef} placeholder="Name" /></td>
            <td><input ref={categoryRef} placeholder="Category" /></td>
            <td><input ref={priceRef} type="number" placeholder="Price" /></td>
            <td>
              <select ref={statusRef}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </td>
            <td><button onClick={handleSave}>Add New</button></td>
          </tr>
        </tbody>
      </table>
      <div style={{ textAlign: 'center' }}>
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>Prev</button>
        <span style={{ margin: '0 15px' }}>{page} / {totalPages}</span>
        <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}