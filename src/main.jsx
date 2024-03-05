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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
        <Route path = "/" element={<App />} />
        <Route path="/addfurniture" element={<AddFurniture />} />
        <Route path="/*" element={<div>Not Found</div>} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <RouterProvider router={router} />
  </ChakraProvider>
);
