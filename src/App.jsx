import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Scan from "./pages/Scan";
import Rewards from "./pages/Rewards";
import Profile from "./pages/Profile";
import ShopQR from "./pages/ShopQR";
import CustomerHistory from "./pages/CustomerHistory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/home" element={<Home />} />

        <Route path="/scan" element={<Scan />} />

        <Route path="/rewards" element={<Rewards />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/shopqr" element={<ShopQR />} />

        <Route
          path="/customer-history"
          element={<CustomerHistory />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;