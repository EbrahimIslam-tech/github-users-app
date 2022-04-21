import HomePage from "./Components/HomePage/HomePage";
import LoginRegistration from "./Components/LoginRegistration/LoginRegistration";
import AuthProvider from "./contexts/AuthProvider/AuthProvider";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import Header from "./Components/HomePage/Header";
import Admin from "./Components/HomePage/Admin";
import PrivateRoute from "./Components/privateRoute/PrivateRoute";
import Repositorys from "./Components/HomePage/Repositorys/Repositorys";

function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<LoginRegistration />} />
            <Route path="/users/:userid" element={<Repositorys />} />

            <Route
              path="/admin"
              element={
                <PrivateRoute>
                  {" "}
                  <Admin></Admin>{" "}
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
