import React from 'react';
import { Link } from 'react-router-dom';
import * as Styles from './Styles/NavBarStyles'; 
const NavBar = () => {
  return (
    <Styles.NavbarContainer>
      <Link to="/create">
        <Styles.Button>
           Create Song
        </Styles.Button>
      </Link>
    </Styles.NavbarContainer>
  );
}

export default NavBar;
