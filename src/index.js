import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";

import App from "./App";
import Loginpage from "./Loginpage.js";
import ProtectedRoutes from "./ProtectedRoutes.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
function Indexpage() {
  return (
    <>
      <h1>indexpage</h1>
      <button>
        <Link to="/login">Login</Link>
      </button>
    </>
  );
}
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Indexpage />} />
        <Route element={<ProtectedRoutes loggedin={false} />}>
          <Route path="/login" element={<Loginpage />} />
        </Route>

        <Route element={<ProtectedRoutes loggedin={true} />}>
          <Route path="/home" element={<App />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
