import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button, GridItem, Grid } from "@chakra-ui/react";
import { Link, Outlet } from "react-router-dom";
import NavBar from "./components/Navbar";
import LoginNavBar from "./components/LoginNavBar";

function App() {
  const id = sessionStorage.getItem("id");
  const [nullChecker, setNullChecker] = useState(false);

  useEffect(() => {
    if (id !== null && id !== "") {
      setNullChecker(true);
    }
  }, []);

  return (
    <Grid templateAreas={`"header header" "Main Main"`}>
      <GridItem area={"header"}>
        {nullChecker ? <LoginNavBar/> : <NavBar />}
      </GridItem>
      <GridItem area={'Main'}>
        <Outlet />
      </GridItem>
    </Grid>
  );
}

export default App;
