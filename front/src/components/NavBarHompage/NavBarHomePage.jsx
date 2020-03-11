import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText
} from 'reactstrap';

const NavBarHomePage = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="dark" light expand="md">
        <NavbarBrand className="text-light" href="/">LapSteel</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem><NavLink></NavLink></NavItem>
            <NavItem><NavLink></NavLink></NavItem>
          </Nav>

          <NavbarText>
            <Nav className="mr-auto" navbar>
                <NavItem>
                <NavLink className="text-light" href="/Login">Login</NavLink>
                </NavItem>
                <NavItem>
                <NavLink className="text-light" href="/Signin">Sign in</NavLink>
                </NavItem>
            </Nav>
          </NavbarText>

        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavBarHomePage;