import React, { useContext } from "react";

import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { user, dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            {/* <img src={logo} alt="Logo" /> */}
            <h1>Blogify</h1>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/createblog"
                >
                  Create Blog
                </Link>
              </li>
            </ul>
            {user ? (
              <form className="d-flex" role="search">
                <Link>
                  <button className="btn btn-outline-success" type="submit">
                    {user.name}
                  </button>
                </Link>

                <button
                  className="btn btn-outline-dark ms-2"
                  type="submit"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </form>
            ) : (
              <form className="d-flex" role="search">
                <Link to={"/register"}>
                  <button className="btn btn-outline-success" type="submit">
                    Register
                  </button>
                </Link>
                <Link to={"/login"}>
                  <button className="btn btn-outline-dark ms-2" type="submit">
                    Login
                  </button>
                </Link>
              </form>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
