import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button, GridItem, Grid } from "@chakra-ui/react";
import { Link, Outlet } from "react-router-dom";
import NavBar from "./components/Navbar";
import AdminNavBar from "./components/AdminNavBar";
import UserNavBar from "./components/UserNavBar";

function App() {
  const id = sessionStorage.getItem("id");
  const [nullChecker, setNullChecker] = useState(false);
  const roles = sessionStorage.getItem("roles");

  useEffect(() => {
    if (id !== null && id !== "") {
      setNullChecker(true);
    }

  }, []);

  let navBarComponent;
  if (nullChecker === true) {
    if (roles === "Admin") {
      navBarComponent = <AdminNavBar />;
    } else if (roles==="User") {
      navBarComponent = <UserNavBar />;
    }
  } else {
    navBarComponent = <NavBar />;
  }

  return (
    <Grid templateAreas={`"header header" "Main Main"`}>
      <GridItem area={"header"}>
        {navBarComponent}
      </GridItem>
      <GridItem area={'Main'}>
        <Outlet />
      </GridItem>
    </Grid>
  );
}

export default App;
