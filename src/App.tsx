import { BrowserRouter, Routes, Route } from "react-router";
import { lazy } from "react";
//Import your pages here:
const Market = lazy(() => import('./pages/user/Market'));
const Cart = lazy(() => import('./pages/user/Cart'));
const Login = lazy(() => import('./pages/Login'));
const Account = lazy(() => import('./pages/user/Account'));
const Auction = lazy(() => import('./pages/user/Auction'));
const Inventory = lazy(() => import('./pages/admin/Inventory'));

import UserLayout from "./layouts/UserLayout";

export default function App(){
    return (
        <BrowserRouter>
        <Routes>
          <Route path="/login" element = {<Login />} />
          <Route path="/" element = {<UserLayout />} >
            <Route index element = {<Market />} />
            <Route path="/cart" element = {<Cart />} />
            <Route path="/account" element={<Account />} />
            <Route path="/auction" element={<Auction />} />
          </Route>
          {/* 
            Link up your new page here with a path i.e. "/about" and element i.e <AboutPage /> 
            Reference: https://reactrouter.com/start/library/routing
          */}
        </Routes>
      </BrowserRouter>
    )
}