import { collection, getDocs } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { db } from "../../../Firebase/Firebase-config";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  // console.log(users);

  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      // console.log(data);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);
  return (
    <div className="pt-28">
      {" "}
      <h1 className="text-xl text-center ">Our Users</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => {
          return (
            <div key={user.id} className="pt-10 mx-5 ">
              <Link to={`/users/${user.id}`}>
                <button className="text-lg border-2 shadow-lg ">
                  {" "}
                  name:{user.name}
                </button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Users;
