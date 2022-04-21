import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Users from "./Users/Users";

const HomePage = () => {
  return (
    <div>
      {/* home page <br /> */}
      <Header></Header>
      {/* <Link to="/login">login</Link>
      <Link to="/admin">admin</Link> */}
      <div className="">
         <Users></Users>
      </div>
     
    </div>
  );
};

export default HomePage;
