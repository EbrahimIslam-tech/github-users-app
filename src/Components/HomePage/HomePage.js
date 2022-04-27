import React from "react";

import Header from "./Header";
import Users from "./Users/Users";

const HomePage = () => {
  return (
    <div>
    
      <Header></Header>
 
      <div className="">
         <Users></Users>
      </div>
     
    </div>
  );
};

export default HomePage;
