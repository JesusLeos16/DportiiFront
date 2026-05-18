import React, { useState, useEffect } from "react";
import { getTorneosRequest } from "../api/torneoApi";
import { getBracket, generarMatchup, swapMatchup } from "../api/matchupApi";
import {
  SingleEliminationBracket,
  Match,
  SVGViewer,
} from "@g-loot/react-tournament-brackets";

export const MatchupPage = () => {
  const [torneos, setTorneos] = useState([]);
  const [selectedTorneo, setSelectedTorneo] = useState("");
  const [categoria, setCategoria] = useState("Peso Ligero");
  const [nivel, setNivel] = useState("Principiante");
  const [bracket, setBracket] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [swapMode, setSwapMode] = useState(false);
  const [selectedMatchup1, setSelectedMatchup1] = useState(null);

  useEffect(() => {
    cargarTorneos();
  }, []);

  const cargarTorneos = async () => {
    try {
      const data = await getTorneosRequest();
      setTorneos(data);
    } catch (err) {
      console.error("Error al cargar torneos", err);
    }
  };

  useEffect(() => {
    if (selectedTorneo && categoria && nivel) {
      cargarBracket();
    }
  }, [selectedTorneo, categoria, nivel]);

  const cargarBracket = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getBracket(selectedTorneo, categoria, nivel);
      setBracket(data);
    } catch (err) {
      console.error(err);
      setError("Error al cargar llaves");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerar = async () => {
    setLoading(true);
    setError("");
    try {
      await generarMatchup(selectedTorneo, categoria, nivel);
      await cargarBracket();
    } catch (err) {
      setError(err.response?.data?.error || "Error al generar llaves");
    } finally {
      setLoading(false);
    }
  };

  const handleFighterClick = async (matchupId) => {
    if (!swapMode) return;

    if (!selectedMatchup1) {
      setSelectedMatchup1(matchupId);
    } else {
      if (selectedMatchup1 === matchupId) {
        setSelectedMatchup1(null);
        return;
      }
      setLoading(true);
      try {
        await swapMatchup(selectedMatchup1, matchupId);
        setSelectedMatchup1(null);
        await cargarBracket();
      } catch (err) {
        setError("Error al intercambiar peleadores");
      } finally {
        setLoading(false);
      }
    }
  };

  const formatBracketData = (combates) => {
    if (!combates || combates.length === 0) return [];

    const r1Matches = [...combates].sort((a, b) => {
      const pA = parseInt(a.posicion_bracket.split("-")[1]);
      const pB = parseInt(b.posicion_bracket.split("-")[1]);
      return pA - pB;
    });

    let baseCount = 1;
    while (baseCount < r1Matches.length) baseCount *= 2;

    let allMatches = [];
    let currentRoundMatches = [];

    for (let i = 0; i < baseCount; i++) {
      const peleaReal = r1Matches[i];
      currentRoundMatches.push({
        id: peleaReal ? peleaReal.idCombate : `dummy-r1-${i}`,
        name: `Ronda 1 - Pelea ${i + 1}`,
        nextMatchId: null,
        tournamentRoundText: "R1",
        state: "SCHEDULED",
        participants: [
          {
            id: peleaReal?.esquinaRoja?.idMatchup || `dummy-roja-${i}`,
            resultText: null,
            isWinner: peleaReal
              ? peleaReal.idGanador === peleaReal.esquinaRoja?.idPeleador
              : false,
            status: null,
            name: peleaReal?.esquinaRoja?.nombre || "TBD",
            academy: peleaReal?.esquinaRoja?.academia || "",
          },
          {
            id: peleaReal?.esquinaAzul?.idMatchup || `dummy-azul-${i}`,
            resultText: null,
            isWinner: peleaReal
              ? peleaReal.idGanador === peleaReal.esquinaAzul?.idPeleador
              : false,
            status: null,
            name: peleaReal?.esquinaAzul?.nombre
              ? peleaReal.esquinaAzul.nombre
              : peleaReal
                ? "BYE"
                : "TBD",
            academy: peleaReal?.esquinaAzul?.academia || "",
          },
        ],
      });
    }

    allMatches = [...currentRoundMatches];
    let roundNum = 2;
    while (currentRoundMatches.length > 1) {
      let nextRoundMatches = [];
      for (let i = 0; i < currentRoundMatches.length; i += 2) {
        const nextId = `dummy-r${roundNum}-${i}`;
        currentRoundMatches[i].nextMatchId = nextId;
        currentRoundMatches[i + 1].nextMatchId = nextId;

        nextRoundMatches.push({
          id: nextId,
          name:
            currentRoundMatches.length === 2 ? "Final" : `Ronda ${roundNum}`,
          nextMatchId: null,
          tournamentRoundText:
            currentRoundMatches.length === 2 ? "Final" : `R${roundNum}`,
          state: "SCHEDULED",
          participants: [],
        });
      }
      allMatches = [...allMatches, ...nextRoundMatches];
      currentRoundMatches = nextRoundMatches;
      roundNum++;
    }

    return allMatches;
  };

  const formattedMatches = formatBracketData(bracket);

  const [dimensions, setDimensions] = useState({
    width:
      typeof window !== "undefined"
        ? Math.min(window.innerWidth - 100, 1200)
        : 800,
    height: 600,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: Math.min(window.innerWidth - 100, 1200),
        height: 600,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="p-4 md:p-8 max-w-[1400px] mx-auto min-h-screen animate-fade-in-up pb-24">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-blue-950 tracking-tight">
            Matchups
          </h1>
          <p className="text-gray-500 mt-1">
            Genera y administra las llaves del torneo
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4">
        <select
          value={selectedTorneo}
          onChange={(e) => setSelectedTorneo(e.target.value)}
          className="w-full md:w-1/3 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-gray-50 font-medium"
        >
          <option value="">Selecciona un Torneo</option>
          {torneos.map((t) => (
            <option key={t.idTorneo} value={t.idTorneo}>
              {t.nombre} - {new Date(t.fecha).toLocaleDateString()}
            </option>
          ))}
        </select>

        <select
          value={nivel}
          onChange={(e) => setNivel(e.target.value)}
          className="w-full md:w-1/3 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-gray-50 font-medium"
        >
          <option value="Principiante">Principiante</option>
          <option value="Intermedio">Intermedio</option>
          <option value="Avanzado">Avanzado</option>
        </select>

        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="w-full md:w-1/3 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-gray-50 font-medium"
        >
          <option value="Peso Ligero">Peso Ligero (-68kg)</option>
          <option value="Peso Intermedio">Peso Intermedio (68kg - 79kg)</option>
          <option value="Peso Pesado">Peso Pesado (+79kg)</option>
        </select>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 font-medium border border-red-100 flex items-center gap-2">
          <span>⚠️</span> {error}
        </div>
      )}

      {selectedTorneo && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 min-h-[500px]">
          {loading ? (
            <div className="flex justify-center items-center h-64 text-blue-600 font-bold">
              Cargando árbol de torneo...
            </div>
          ) : bracket.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-10 h-10 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                No hay llaves generadas
              </h3>
              <p className="text-gray-500 mb-6">
                Aún no se han armado los combates para esta categoría.
              </p>
              <button
                onClick={handleGenerar}
                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
              >
                Generar Llaves Oficiales
              </button>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-8 border-b pb-4">
                <h2 className="text-2xl font-bold text-blue-950">
                  Bracket Oficial: {nivel} - {categoria}
                </h2>
                <button
                  onClick={() => {
                    setSwapMode(!swapMode);
                    setSelectedMatchup1(null);
                  }}
                  className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${
                    swapMode
                      ? "bg-red-100 text-red-700 border border-red-200"
                      : "bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100"
                  }`}
                >
                  {swapMode ? "Cancelar Intercambio" : "Modo Edición (Swap)"}
                </button>
              </div>

              {swapMode && (
                <div className="mb-6 p-4 bg-yellow-50 text-yellow-800 rounded-xl border border-yellow-200 text-sm font-medium">
                  {selectedMatchup1
                    ? "Selecciona el segundo peleador para intercambiar."
                    : "Haz clic en el nombre de un peleador dentro del árbol que desees cambiar de lugar."}
                </div>
              )}

              {/* Renderizado de la Librería */}
              <div className="overflow-x-auto custom-scrollbar p-4 bg-slate-50 rounded-xl border border-slate-200">
                <SingleEliminationBracket
                  matches={formattedMatches}
                  matchComponent={({ match, ...props }) => {
                    return (
                      <Match
                        match={match}
                        {...props}
                        onPartyClick={(party) => {
                          if (
                            party.id &&
                            !party.id.toString().startsWith("dummy")
                          ) {
                            handleFighterClick(party.id);
                          }
                        }}
                      />
                    );
                  }}
                  svgWrapper={({ children, ...props }) => (
                    <SVGViewer
                      width={dimensions.width}
                      height={dimensions.height}
                      background="#f8fafc"
                      SVGBackground="#f8fafc"
                      {...props}
                    >
                      {children}
                    </SVGViewer>
                  )}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
