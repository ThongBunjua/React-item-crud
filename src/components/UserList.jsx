import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function UserList() {
  const [users, setUsers] = useState([]);
  
  const usernameRef = useRef();
  const passwordRef = useRef();
  const emailRef = useRef();
  const firstnameRef = useRef();
  const lastnameRef = useRef();

  const loadUsers = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/user");
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { loadUsers(); }, []);

  const handleAdd = async () => {
    const body = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
      email: emailRef.current.value,
      firstname: firstnameRef.current.value,
      lastname: lastnameRef.current.value
    };

    const res = await fetch("http://localhost:3000/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    if (res.ok) {
      alert("User Created Successfully!");
      loadUsers(); 
      usernameRef.current.value = "";
      passwordRef.current.value = "";
      emailRef.current.value = "";
      firstnameRef.current.value = "";
      lastnameRef.current.value = "";
    } else {
      const err = await res.json();
      alert("Error: " + err.message); 
    }
  };

  const handleDelete = async (id) => {
    if(!confirm("Are you sure you want to delete this user?")) return;
    await fetch(`http://localhost:3000/api/user/${id}`, { method: "DELETE" });
    loadUsers();
  };

  return (
    <div>
      <h1>User Management List</h1>
      <table border="1" cellPadding="5" style={{width:'100%', borderCollapse: 'collapse'}}>
        <thead>
          <tr style={{background:'#eee'}}>
            <th>Username</th>
            <th>Email</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.firstname}</td>
              <td>{u.lastname}</td>
              <td>
                <span style={{
                  color: u.status === 'ACTIVE' ? 'green' : u.status === 'DELETED' ? 'red' : 'orange',
                  fontWeight: 'bold'
                }}>
                  {u.status}
                </span>
              </td>
              <td>
                <Link to={`/user/${u._id}`}>
                  <button style={{marginRight:'5px'}}>Edit</button>
                </Link>
                <button onClick={() => handleDelete(u._id)} style={{background:'red', color:'white'}}>Delete</button>
              </td>
            </tr>
          ))}

          <tr style={{background:'#f9f9f9'}}>
            <td>
              <input ref={usernameRef} placeholder="Username" style={{width:'90%'}} /><br/>
              <input ref={passwordRef} type="password" placeholder="Password" style={{width:'90%', marginTop:'2px'}} />
            </td>
            <td><input ref={emailRef} placeholder="Email" style={{width:'90%'}} /></td>
            <td><input ref={firstnameRef} placeholder="Firstname" style={{width:'90%'}} /></td>
            <td><input ref={lastnameRef} placeholder="Lastname" style={{width:'90%'}} /></td>
            <td>Auto (ACTIVE)</td>
            <td><button onClick={handleAdd}>Add New</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}