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
import { AcademyPage } from "./pages/AcademyPage";
import { Routes, Route, Link } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { PeleadoresPage } from "./pages/PeleadoresPage";
import { TournamentDetailPage } from "./pages/TournamentDetailPage";
import { Layout } from "./components/templates/Layout";
import { RegistrosPage } from "./pages/RegistrosPage";
import { MatchupPage } from "./pages/MatchupPage";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route
          path="/torneos"
          element={
            <ProtectedRoute>
              <Layout>
                <TournamentPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/torneos/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <TournamentDetailPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/registros"
          element={
            <ProtectedRoute>
              <Layout>
                <RegistrosPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/peleadores"
          element={
            <ProtectedRoute>
              <Layout>
                <PeleadoresPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/academias"
          element={
            <ProtectedRoute>
              <Layout>
                <AcademyPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        {/* Agrega rutas de combate y matchup igual si ya las tienes */}
        <Route
          path="/combate"
          element={
            <ProtectedRoute>
              <Layout>
                <div className="p-10 text-center font-bold text-gray-500">Módulo de Combate (Próximamente)</div>
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/matchup"
          element={
            <ProtectedRoute>
              <Layout>
                <MatchupPage />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}
