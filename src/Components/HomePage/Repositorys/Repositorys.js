import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "./../../../hooks/useAuth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../Firebase/Firebase-config";
import { Button, Spinner } from "react-bootstrap";
const Repositorys = () => {
  const { userid } = useParams();
  //   console.log(userid);
  const [isLoading, setIsLoading] = useState(true);

  const [repos, setRepos] = useState([]);
  console.log(repos, "repo");

  const [error, setError] = useState("");
  //   const { user } = useAuth();
  const [users, setUsers] = useState([]);

  const usersCollectionRef = collection(db, "users");
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      // console.log(data);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  const singleUser = users.filter((user) => user.id === userid);
  const githubusername = singleUser[0]?.githubname;
  //   console.log(githubusername);
  const url = `https://api.github.com/users/${githubusername}/repos`;
//   console.log(url, "url");
  useEffect(() => {
    setIsLoading(true);
    fetch(`https://api.github.com/users/${githubusername}/repos`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data, "data");
        setRepos(data);
      })
      .catch((error) => {
        setError(error.message);
      });
    setIsLoading(false);
  }, []);
  if (isLoading) {
    return (
      <Button variant="danger" disabled>
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        Loading...
      </Button>
    );
  }
  return (
    <div>
      <div>
        {repos.map((repo) => {
          return <div className=" pt-10 mx-5">{repo.name}</div>;
        })}
      </div>
    </div>
  );
};

export default Repositorys;
