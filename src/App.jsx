import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button, GridItem, Grid } from "@chakra-ui/react";
import { Link, Outlet } from "react-router-dom";
import NavBar from "./components/Navbar";

function App() {
  return (
    <Grid templateAreas={`"header header" "Main Main"`}>
      <GridItem area={"header"}>
        <NavBar />
      </GridItem>
      <GridItem area={'Main'}>
        <Outlet />
      </GridItem>
    </Grid>
  );
}

export default App;
