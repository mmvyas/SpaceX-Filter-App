import React from "react";

const Header = props => {
  return (
    <header role="banner">
      <a href="/">{props.title}</a>
      <h1>{props.banner}</h1>
      <button onClick={props.handleClick}>
        <img src="../assets/down-chevron-white.svg" alt="Down chevron" />
      </button>
    </header>
  );
};

export default Header;
