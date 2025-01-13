import { BrowserRouter, Routes, Route } from "react-router";
//Import your pages here:
import Inventory from "./pages/admin/Inventory";
import Market from "./pages/user/Market";
import Login from "./pages/Login"
import Account from "./pages/user/Account";
import Auction from "./pages/user/Auction";
import Cart from "./pages/user/Cart";

export default function App(){
    return (
        <BrowserRouter>
        <Routes>
          <Route path="/login" element = {<Login />} />
          <Route path="/" element = {<Market />} />
          <Route path="/cart" element = {<Cart />} />
          <Route path="/account" element={<Account />} />
          <Route path="/auction" element={<Auction />} />
          <Route path="/admin/inventory" element={<Inventory/>} />
          {/* 
            Link up your new page here with a path i.e. "/about" and element i.e <AboutPage /> 
            Reference: https://reactrouter.com/start/library/routing
          */}
        </Routes>
      </BrowserRouter>
    )
}