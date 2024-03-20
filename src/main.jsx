import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  BrowserRouter,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import AddFurniture from "./pages/AddFurniture.jsx";
import Home from "./pages/Home.jsx";
import Furniture from "./pages/Furniture.jsx";
import UpdateFurniture from "./pages/UpdateFurniture.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import AccountDetails from "./pages/AccountDetails.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Home />} />
        <Route path="/furniture" element={<Furniture />} />
        <Route path="/addfurniture" element={<AddFurniture />} />
        <Route path="/updatefurniture" element={<UpdateFurniture/>} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/user" element={<AccountDetails/>}/>
        <Route path="/*" element={<div>Not Found</div>} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <RouterProvider router={router} />
  </ChakraProvider>
);
