import "./index.css";
import ColorDetails from "./pages/ColorDetails";
import ColorPalette from "./pages/ColorPalette";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:palette" element={<ColorPalette />} />
      <Route path="/details/:hex" element={<ColorDetails />} />
    </Routes>
  );
}

export default App;
