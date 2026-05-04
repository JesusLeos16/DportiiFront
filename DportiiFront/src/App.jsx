//  import { useState } from "react";
//  import {Navbar} from "./components/organisms/Navbar";
//  import { TournamentForm } from "./components/organisms/TournamentForm";
//  import "./App.css";
//  import { TournamentPage } from "./pages/TournamentPage";
// import { AcademyPage } from "./pages/AcademyPage";

//  function App() {
//    const [count, setCount] = useState(0);

//    return (
//      <>
//       <Navbar />
//       <AcademyPage />
//      </>
//    );
// }

// export default App;

import { TournamentPage } from "./pages/TournamentPage";
import { Navbar } from "./components/organisms/navbar";
import { AcademyPage } from "./pages/AcademyPage";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/torneos"
          element={
            <ProtectedRoute>
              <Navbar/>
              <TournamentPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/academias"
          element={
            <ProtectedRoute>
              <Navbar />
              <AcademyPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}
