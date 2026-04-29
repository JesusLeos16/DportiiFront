import { useState } from "react";
import {Navbar} from "./components/organisms/Navbar";
import { TournamentForm } from "./components/organisms/TournamentForm";
import "./App.css";
import { TournamentPage } from "./pages/TournamentPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <TournamentPage />
    </>
  );
}

export default App;
