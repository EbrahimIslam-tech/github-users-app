import HomePage from "./Components/HomePage/HomePage";
import LoginRegistration from "./Components/LoginRegistration/LoginRegistration";
import AuthProvider from "./contexts/AuthProvider/AuthProvider";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";

import PrivateRoute from "./Components/privateRoute/PrivateRoute";
import Repositorys from "./Components/HomePage/Repositorys/Repositorys";
import Bookmarks from './Components/HomePage/Bookmarks/Bookmarks';

function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<LoginRegistration />} />
           

            <Route
              path="/users/:userid"
              element={
                <PrivateRoute>
                  <Repositorys />
                </PrivateRoute>
              }
            />
            <Route
              path="/bookmarks"
              element={
                <PrivateRoute>
                  <Bookmarks />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
