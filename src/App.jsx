import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ItemList from "./components/ItemList";
import ItemEdit from "./components/ItemEdit";
import UserList from "./components/UserList"; 
import UserEdit from "./components/UserEdit"; 

function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        
        <nav style={{ marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #ccc' }}>
          <Link to="/" style={{ marginRight: '20px', textDecoration: 'none', fontWeight: 'bold', color: '#333' }}>
            Item Management
          </Link>
          <Link to="/users" style={{ textDecoration: 'none', fontWeight: 'bold', color: '#333' }}>
            User Management
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<ItemList />} />
          <Route path="/item/:id" element={<ItemEdit />} />

          <Route path="/users" element={<UserList />} />
          <Route path="/user/:id" element={<UserEdit />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;