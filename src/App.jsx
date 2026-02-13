import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { UserProvider } from "./contexts/UserProvider"; 
import RequireAuth from "./middleware/RequireAuth";     

import ItemList from "./components/ItemList";
import ItemEdit from "./components/ItemEdit";
import UserList from "./components/UserList";
import UserEdit from "./components/UserEdit";

import Login from "./components/Login";
import Profile from "./components/Profile";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <div style={{ padding: '20px' }}>
          <nav style={{ marginBottom: "20px", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
            <Link to="/login" style={{ marginRight: "10px" }}>Login</Link>
            <Link to="/profile" style={{ marginRight: "10px" }}>My Profile</Link>
            <Link to="/users" style={{ marginRight: "10px" }}>User List</Link>
            <Link to="/" style={{ marginRight: "10px" }}>Item List</Link>
          </nav>

          <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route path="/profile" element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            } />

            <Route path="/users" element={<UserList />} />
            <Route path="/user/:id" element={<UserEdit />} />
            <Route path="/" element={<ItemList />} />
            <Route path="/item/:id" element={<ItemEdit />} />
          </Routes>
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;