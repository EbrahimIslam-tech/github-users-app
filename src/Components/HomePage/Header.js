import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

import { NavLink } from "react-router-dom";
import useAuth from "./../../hooks/useAuth";

const Header = () => {
  const [navbar, setNavbar] = useState(false);
  // const { admin, user, logOut } = useAuth();
  const { user, logOut } = useAuth();
  const changBackground = () => {
    window.scrollY >= 100 ? setNavbar(false) : setNavbar(true);
  };
  window.addEventListener("scroll", changBackground);
  return (
    <div>
      <nav
        className={
          navbar
            ? "md:fixed md:w-screen md:flex justify-around items-center w-full py-6 "
            : "md:fixed md:w-screen md:flex justify-around items-center w-full py-6 bg-white shadow-lg z-10 "
        }
      >
        <div className=" md:mr-20 ">
          <NavLink
            to="/home"
            className=" text-2xl font-bold no-underline flex md:justify-start justify-center items-center"
          >
            <img
              src="https://i.ibb.co/zJtk1T5/Octocat.png"
              alt=""
              className="w-10"
            />
            <span
              className={
                navbar
                  ? " md:text-white font-mono mt-2"
                  : " md:text-black font-mono mt-2"
              }
            >
              GithubUsers
            </span>
          </NavLink>
        </div>
        <div className="flex md:flex-row flex-col-reverse ">
          <Navbar collapseOnSelect expand="lg">
            <Container>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav>
                  <NavLink to="/home">
                    <span
                      className={
                        navbar
                          ? "font-bold uppercase md:mr-6 mr-0 no-underline group md:text-white hover:text-red-600"
                          : "font-bold uppercase md:mr-6 mr-0 no-underline group md:text-black  hover:text-red-700"
                      }
                    >
                      Home
                    </span>
                  </NavLink>
                  <NavLink to="/exploreProducts">
                    <span
                      className={
                        navbar
                          ? "font-bold uppercase md:mx-6  no-underline md:text-white hover:text-red-600 "
                          : "font-bold uppercase md:mx-6  no-underline md:text-black hover:text-red-700 "
                      }
                    >
                      BookMarks
                    </span>
                  </NavLink>
                  <NavLink to="/about">
                    <span
                      className={
                        navbar
                          ? "font-bold uppercase md:mx-6  no-underline md:text-white hover:text-red-600 "
                          : "font-bold uppercase md:mx-6  no-underline md:text-black hover:text-red-700 "
                      }
                    >
                      Repositorys
                    </span>
                  </NavLink>
                 
               
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <section className="flex items-center justify-center mt-0 sm:mt-5 md:ml-14 ">
            {user.email ? (
              <div>
                <button
                  onClick={logOut}
                  className=" text-sm no-underline text-black uppercase font-bold   bg-yellow-400 px-6  rounded-full md:rounded-none py-2 mr-5 tracking-widest"
                >
                  <span className="text-xs">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center">
                <NavLink
                  to="/login"
                  className=" text-sm no-underline text-black uppercase font-bold   bg-yellow-400 px-6 py-2 tracking-widest mt-2 md:mt-0"
                >
                  Login
                </NavLink>
              </div>
            )}

            {user.email && (
              <div>
                <NavLink to="/home" className=" text-2xl text-black">
                  <div className="flex items-center">
                    <img
                      src={user.photoURL}
                      alt=""
                      className="rounded-full border-2 border-yellow-400 w-12 h-12 mr-1"
                    />
                    <span
                      className={
                        navbar
                          ? "font-semibold text-xs md:text-white"
                          : "font-semibold text-xs text-black"
                      }
                    >
                      {user.displayName}
                    </span>
                  </div>
                </NavLink>
              </div>
            )}
          </section>
        </div>
      </nav>
    </div>
  );
};

export default Header;
