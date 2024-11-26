import React from 'react';
import { Link } from 'react-router-dom';
import { HeaderContainer, Nav, NavList, NavItem } from './Header.styles';

const Header = () => {
  return (
    <HeaderContainer>
      <Nav>
        <NavList>
          <NavItem>
            <Link to="/">Home</Link>
          </NavItem>
          <NavItem>
            <Link to="/about">About</Link>
          </NavItem>
          <NavItem>
            <Link to="/projects">Projects</Link>
          </NavItem>
          <NavItem>
            <Link to="/blog">Blog</Link>
          </NavItem>
          <NavItem>
            <Link to="/contact">Contact</Link>
          </NavItem>
        </NavList>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;