import React, { useRef } from 'react';

import { Grid } from '@mui/material';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';

function Navbar() {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle('responsive_nav');
  };

  return (
    <header>
      <Grid item>
        <img
          src="https://e7.pngegg.com/pngimages/460/751/png-clipart-ball-game-football-graphics-football-logo-monochrome.png"
          width="152"
          alt="logo"
        />
      </Grid>
      <nav ref={navRef}>
        <a href="/">Home</a>
        <a href="/criarvenda">Cadastrar Vendas</a>

        <button
          className="nav-btn nav-close-btn"
          onClick={showNavbar}
          type="button"
        >
          <FaTimes />
        </button>
      </nav>
      <button className="nav-btn" onClick={showNavbar} type="button">
        <FaBars />
      </button>
    </header>
  );
}

export default Navbar;
