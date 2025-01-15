import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

import Login from "./pages/Login";
import Market from "./pages/user/Market";
import Cart from "./pages/user/Cart";
import Account from "./pages/user/Account";
import Auction from "./pages/user/Auction";
import Inventory from "./pages/admin/Inventory";

export default function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Market />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/account" element={<Account />} />
            <Route path="/auction" element={<Auction />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="inventory" element={<Inventory />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}
