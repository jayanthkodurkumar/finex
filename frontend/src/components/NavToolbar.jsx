import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import { AuthContext } from "../context/AuthContext";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";

const NavToolbar = () =>{
  const navigate = useNavigate();
  const {user,name,logout} = useContext(AuthContext)
  console.log(name)
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

   const handleProfileClick = () => {
     navigate("/profile");
   };

      const handleHome = () => {
     navigate("/");
   };

  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand onClick={handleHome}>FINEX</Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end me-auto">
          <Navbar.Text className="me-3">
            Signed in as: <span>{name.name}</span>
          </Navbar.Text>
          <Nav.Link onClick={handleProfileClick} className="me-3">
            Profile
          </Nav.Link>

          <Button variant="secondary" className="" onClick={handleLogout}>
            Sign Out
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavToolbar;
