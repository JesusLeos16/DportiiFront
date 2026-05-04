 import { useState } from "react";
 import {Navbar} from "./components/organisms/Navbar";
 import { TournamentForm } from "./components/organisms/TournamentForm";
 import "./App.css";
 import { TournamentPage } from "./pages/TournamentPage";
import { AcademyPage } from "./pages/AcademyPage";

 function App() {
   const [count, setCount] = useState(0);

   return (
     <>
      <Navbar />
      <AcademyPage />
     </>
   );
}

export default App;



// import { Routes, Route, Link } from 'react-router-dom'
// import Login from './pages/Login'
// import Dashboard from './pages/Dashboard'
// import Users from './pages/Users'
// import ProtectedRoute from './components/ProtectedRoute'

// export default function App() {
//   return (
//     <div>
//       <nav>
//         <Link to="/">Login</Link> |{" "}
//         <Link to="/dashboard">Dashboard</Link> |{" "}
//         <Link to="/users">Users</Link>
//       </nav>

//       <Routes>
//         <Route path="/" element={<Login />} />

//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/users"
//           element={
//             <ProtectedRoute>
//               <Users />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </div>
//   )
// }
