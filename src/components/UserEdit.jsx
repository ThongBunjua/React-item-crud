import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function UserEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const usernameRef = useRef();
  const emailRef = useRef();
  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const statusRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    fetch(`http://localhost:3000/api/user/${id}`)
      .then(res => res.json())
      .then(data => {
        usernameRef.current.value = data.username;
        emailRef.current.value = data.email;
        firstnameRef.current.value = data.firstname;
        lastnameRef.current.value = data.lastname;
        statusRef.current.value = data.status;
      });
  }, [id]);

  const handleUpdate = async () => {
    const body = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      firstname: firstnameRef.current.value,
      lastname: lastnameRef.current.value,
      status: statusRef.current.value,
      password: passwordRef.current.value
    };

    const res = await fetch(`http://localhost:3000/api/user/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    if (res.ok) {
      alert("User Updated Successfully!");
      navigate("/"); 
    } else {
      alert("Error updating user");
    }
  };

  return (
    <div style={{padding: '20px', maxWidth: '500px', margin: '0 auto'}}>
      <h1>Edit User Information</h1>
      
      <div style={{display:'flex', flexDirection:'column', gap:'15px'}}>
        <div>
          <label>Username:</label>
          <input ref={usernameRef} style={{width: '100%', padding: '8px'}} />
        </div>

        <div>
          <label>Email:</label>
          <input ref={emailRef} style={{width: '100%', padding: '8px'}} />
        </div>

        <div style={{display:'flex', gap:'10px'}}>
          <div style={{flex:1}}>
            <label>Firstname:</label>
            <input ref={firstnameRef} style={{width: '100%', padding: '8px'}} />
          </div>
          <div style={{flex:1}}>
            <label>Lastname:</label>
            <input ref={lastnameRef} style={{width: '100%', padding: '8px'}} />
          </div>
        </div>

        <div>
          <label>Status:</label>
          <select ref={statusRef} style={{width: '100%', padding: '8px'}}>
            <option value="ACTIVE">ACTIVE</option>
            <option value="SUSPENDED">SUSPENDED</option>
            <option value="DELETED">DELETED</option>
          </select>
        </div>

        <div>
          <label>New Password (Optional):</label>
          <input ref={passwordRef} type="password" placeholder="Leave blank to keep current password" style={{width: '100%', padding: '8px'}} />
        </div>

        <div style={{marginTop: '20px'}}>
          <button onClick={handleUpdate} style={{padding: '10px 20px', marginRight: '10px', cursor: 'pointer'}}>Save Changes</button>
          <button onClick={() => navigate("/")} style={{padding: '10px 20px', cursor: 'pointer', background: '#ccc'}}>Cancel</button>
        </div>
      </div>
    </div>
  );
}