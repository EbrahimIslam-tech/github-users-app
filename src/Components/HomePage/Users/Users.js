import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { db } from "../../../Firebase/Firebase-config";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);

  const usersCollectionRef = collection(db, "users");

  /*  const createUser = async () => {
      await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) });
    };
    const updateUser = async (id, age) => {
      const userDoc = doc(db, "users", id);
      const newFields = { age: age + 1 };
      await updateDoc(userDoc, newFields);
    };
    const deleteUser = async (id) => {
      const userDoc = doc(db, "users", id);
      await deleteDoc(userDoc);
    }; */
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
      <h1 className=" text-center text-xl">Our Users</h1>
      <div className=" grid grid-cols-3 ">
        {users.map((user) => {
          return (
            <div className=" pt-10 mx-5">
              <Link to={`/users/${user.id}`}>
                <button className=" text-lg border-2 shadow-lg">
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
