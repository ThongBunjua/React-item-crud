import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemList from "./components/ItemList";
import ItemEdit from "./components/ItemEdit";

function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<ItemList />} />
          
          <Route path="/item/:id" element={<ItemEdit />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;