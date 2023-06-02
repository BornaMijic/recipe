import React from 'react'
import { Link } from "react-router-dom";
import { currentUser, authenticationService } from '../services/authenticationService';
import { useEffect, useState } from "react";

const Navigation = () => {

  const [logInUser, setLogInUser] = useState("");

  useEffect(() => {
    const getUser = async () => {
      currentUser.subscribe((user) => {
        setLogInUser(user)
      })
    };
    getUser();
  }, []);

  function logout() {
    authenticationService.logout();
  }


  return (
    <header>
  <nav className="navbar bg-secondary">
    <Link  to="/" className="brand" >Recipe</Link >
    <div className="nav-right">
    {!logInUser && <Link  to="/login" className="nav-link"  >Login</Link>}
      {!logInUser && <Link   to="/registration" className="nav-link"  >Registration</Link >}
      {logInUser && <p  className="nav-link" >{logInUser}</p>}
      <Link  className="nav-link"  onClick={() =>logout()}>Logout</Link>
    </div>
  </nav>
</header>

  )
}

export default Navigation
