import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAuth from "./../../../hooks/useAuth";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../../Firebase/Firebase-config";
import { Button, Spinner } from "react-bootstrap";
import { async } from "@firebase/util";
const Repositorys = () => {
  const { userid } = useParams();
  //   console.log(userid);
  const [isLoading, setIsLoading] = useState(true);

  const [repos, setRepos] = useState([]);
  //  console.log(repos, "repo");

  const [error, setError] = useState("");
  const { user } = useAuth();
  // console.log(user.uid);
  const [users, setUsers] = useState([]);
  // console.log(users, "users");

  const usersCollectionRef = collection(db, "users");

  const createBookmark = async (id, bookmark) => {
    const bookmarkCollectionRef = collection(db, `bookmarks`);
    try {
      await addDoc(bookmarkCollectionRef, {
        bookmarks: bookmark,
        userid: id,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

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
  }, [users]);

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
      <div className="flex justify-around mt-10">
        <h1 className="text-lg text-center ">
          {singleUser[0]?.name}'s Git Repositorys{" "}
        </h1>
        <Link to="/home">
          <button className="p-2 text-white bg-yellow-500 border-2 shadow-lg rounded-xl ">
            Go To Home Page
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {repos.map((repo) => {
          return (
            <div key={repo.id} className="pt-10 mx-5 ">
              <h3 className="text-sm ">
                {repo.name}
                <button
                  className="p-2 ml-2 border-2 rounded-sm shadow-lg "
                  onClick={() => {
                    createBookmark(user.uid, repo.html_url);
                    alert("Added to bookmarks please check bookmarks");
                  }}
                >
                  Add to bookmark
                </button>
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Repositorys;
