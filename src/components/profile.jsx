import { useUser } from "../contexts/UserProvider";
import { useEffect, useState, useRef } from "react";

export default function Profile() {
  const { logout } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [hasImage, setHasImage] = useState(false);
  const fileInputRef = useRef(null);
  
  const API_URL = "";

  async function onUpdateImage() {
    const file = fileInputRef.current?.files[0];
    if (!file) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${API_URL}/api/user/profile/image`, {
        method: "POST",
        body: formData,
        credentials: "include"
      });

      if (response.ok) {
        alert("Image updated successfully.");
        fetchProfile();
      } else {
        alert("Failed to update image.");
      }
    } catch (err) {
      alert("Error uploading image.");
    }
  }

  async function fetchProfile() {
    try {
      const result = await fetch(`${API_URL}/api/user/profile`, {
        credentials: "include"
      });

      if (result.status === 401) {
        logout();
      } else {
        const profileData = await result.json();
        if (profileData.profileImage) setHasImage(true);
        setData(profileData);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px", border: "1px solid #ccc" }}>
      <h3>User Profile</h3>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            {hasImage ? (
              <img 
                src={`${API_URL}${data.profileImage}`} 
                alt="Profile" 
                style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover" }} 
              />
            ) : (
              <div style={{ width: "100px", height: "100px", background: "#eee", borderRadius: "50%", margin: "auto" }}>No Image</div>
            )}
          </div>
          <p><strong>First Name:</strong> {data.firstname}</p>
          <p><strong>Last Name:</strong> {data.lastname}</p>
          <p><strong>Email:</strong> {data.email}</p>
          
          <hr/>
          <input type="file" ref={fileInputRef} accept="image/*" />
          <button onClick={onUpdateImage} style={{ marginTop: "10px" }}>Upload Image</button>
          <button onClick={logout} style={{ marginTop: "10px", marginLeft: "10px", background: "red", color: "white" }}>Logout</button>
        </div>
      )}
    </div>
  );
}