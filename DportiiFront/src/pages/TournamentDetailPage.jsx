import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getTorneoByIdRequest } from "../api/torneoApi";
import {
  getInscritosPorTorneo,
  inscribirPeleador,
  eliminarInscripcion,
} from "../api/inscripcionApi";
import { getPeleadoresRequest } from "../api/peleadorApi";
import { Button } from "../components/atoms/Button";
import {
  FiUserMinus,
  FiSearch,
  FiArrowLeft,
  FiCheckCircle,
} from "react-icons/fi";
import { FaTrophy } from "react-icons/fa";

export const TournamentDetailPage = () => {
  const { id } = useParams();
  const [torneo, setTorneo] = useState(null);
  const [inscritos, setInscritos] = useState([]);
  const [peleadoresDisponibles, setPeleadoresDisponibles] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPeleador, setSelectedPeleador] = useState(null);
  const [categoriaDetectada, setCategoriaDetectada] = useState("");
  const [overrideCategoria, setOverrideCategoria] = useState("");

  const cargarDatos = async () => {
    try {
      const torneoData = await getTorneoByIdRequest(id);
      setTorneo(torneoData);

      const inscritosData = await getInscritosPorTorneo(id);
      setInscritos(inscritosData);

      const peleadoresData = await getPeleadoresRequest();
      const idsInscritos = inscritosData.map((i) => i.idPeleador);
      const disponibles = peleadoresData.filter(
        (p) => !idsInscritos.includes(p.idPeleador),
      );
      setPeleadoresDisponibles(disponibles);
    } catch (error) {
      console.error("Error al cargar datos del torneo", error);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, [id]);

  const calcularCategoria = (peso, edad) => {
    if (peso <= 68) return "Peso Ligero";
    if (peso <= 79) return "Peso Intermedio";
    return "Peso Pesado";
  };

  const handleSelectPeleador = (peleador) => {
    setSelectedPeleador(peleador);
    const cat = calcularCategoria(peleador.peso, peleador.edad);
    setCategoriaDetectada(cat);
    setOverrideCategoria(cat);
  };

  const handleInscribir = async () => {
    if (!selectedPeleador) return;

    try {
      await inscribirPeleador({
        idTorneo: id,
        idPeleador: selectedPeleador.idPeleador,
        peso_registrado: overrideCategoria,
      });
      setShowModal(false);
      setSelectedPeleador(null);
      setSearchTerm("");
      cargarDatos();
    } catch (error) {
      console.error("Error al inscribir", error);
      alert("Error al inscribir al peleador");
    }
  };

  const handleEliminar = async (idInscripcion) => {
    if (
      window.confirm("¿Seguro que deseas eliminar a este peleador del torneo?")
    ) {
      try {
        await eliminarInscripcion(idInscripcion);
        cargarDatos();
      } catch (error) {
        console.error("Error al eliminar", error);
      }
    }
  };

  const filteredPeleadores = peleadoresDisponibles.filter(
    (p) =>
      p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.academia &&
        p.academia.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  if (!torneo)
    return <div className="p-10 text-center">Cargando torneo...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto relative">
      <div className="mb-6">
        <Link
          to="/torneos"
          className="text-sm font-bold text-blue-600 hover:text-blue-800"
        >
          &larr; Volver a Torneos
        </Link>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-extrabold text-blue-950 mb-2">
            {torneo.nombre}
          </h1>
          <p className="text-gray-500 font-medium text-lg">
            Fecha: {torneo.fecha}
          </p>
          <p className="text-gray-500 font-medium">
            Competidores esperados: {torneo.competidores}
          </p>
        </div>
        <div className="bg-blue-50 text-blue-700 p-4 rounded-xl flex items-center gap-3">
          <FaTrophy size={30} />
          <div>
            <p className="text-sm font-bold opacity-80">CUPOS TOTALES</p>
            <p className="text-2xl font-black">{torneo.competidores}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Peleadores Inscritos ({inscritos.length})
        </h2>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          + Inscribir Peleador
        </Button>
      </div>
      {inscritos.length === 0 ? (
        <div className="bg-gray-50 p-10 rounded-xl text-center border border-gray-200">
          <p className="text-gray-500 font-medium">
            Aún no hay peleadores inscritos en este torneo.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {inscritos.map((inscrito) => (
            <div
              key={inscrito.idInscripcion}
              className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center hover:border-blue-200 transition-colors"
            >
              <div>
                <p className="font-bold text-gray-800 text-lg">
                  {inscrito.nombre} "{inscrito.apodo}"
                </p>
                <p className="text-sm text-gray-500">{inscrito.academia}</p>
                <div className="mt-2 text-xs font-bold bg-blue-100 text-blue-800 px-3 py-1 rounded-full inline-block">
                  {inscrito.peso_registrado || "Categoría libre"}
                </div>
              </div>
              <button
                onClick={() => handleEliminar(inscrito.idInscripcion)}
                className="text-red-400 hover:text-red-600 p-3 hover:bg-red-50 rounded-full transition-colors"
                title="Eliminar del torneo"
              >
                <FiUserMinus size={20} />
              </button>
            </div>
          ))}
        </div>
      )}
      {showModal && (
        <div className="fixed inset-0 bg-gray-50 z-50 overflow-y-auto pb-24">
          <div className="bg-white border-b sticky top-0 z-10 px-6 py-4 flex items-center justify-between shadow-sm">
            <button
              onClick={() => {
                setShowModal(false);
                setSelectedPeleador(null);
              }}
              className="flex items-center text-blue-700 font-bold hover:text-blue-900"
            >
              <FiArrowLeft className="mr-2" size={20} /> Inscribir Peleador
            </button>
            <div className="flex items-center justify-center gap-2">
              <div className="w-6 h-6 rounded-sm">
                <img src="/favi2.png" alt="Dportii Logo" />
              </div>
              <span className="text-xl font-extrabold text-blue-950 tracking-tight">
                Dportii
              </span>
            </div>
          </div>

          <div className="max-w-3xl mx-auto mt-8 px-4">
            <div className="bg-white rounded-2xl p-6 flex items-center gap-4 shadow-sm border border-gray-100 mb-6">
              <div className="bg-blue-100 text-blue-600 p-4 rounded-full">
                <FaTrophy size={24} />
              </div>
              <div>
                <h3 className="font-bold text-xl text-gray-800">
                  {torneo.nombre}
                </h3>
                <p className="text-sm text-gray-500 font-medium">
                  {torneo.fecha} •{" "}
                  {Math.max(0, torneo.competidores - inscritos.length)} CUPOS
                  LIBRES
                </p>
              </div>
            </div>

            <div className="relative mb-6">
              <FiSearch
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Buscar peleador por nombre o academia..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white rounded-xl py-4 pl-12 pr-4 shadow-sm border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 font-medium"
              />
            </div>
            {!selectedPeleador ? (
              <div className="flex flex-col gap-3">
                {filteredPeleadores.length === 0 && (
                  <p className="text-center text-gray-500 py-8">
                    No se encontraron peleadores disponibles.
                  </p>
                )}
                {filteredPeleadores.slice(0, 5).map((p) => (
                  <div
                    key={p.idPeleador}
                    className="bg-white rounded-xl p-4 flex items-center justify-between border border-gray-100 shadow-sm hover:border-blue-300 transition-colors cursor-pointer"
                    onClick={() => handleSelectPeleador(p)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                        <img
                          src={`https://ui-avatars.com/api/?name=${p.nombre}&background=0D8ABC&color=fff`}
                          alt={p.nombre}
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-lg">
                          {p.nombre} "{p.apodo}"
                        </h4>
                        <p className="text-sm text-gray-500">
                          Nivel: {p.nivel}
                        </p>
                      </div>
                    </div>
                    <button className="bg-blue-50 text-blue-600 font-bold px-4 py-2 rounded-lg hover:bg-blue-100">
                      Seleccionar
                    </button>
                  </div>
                ))}
                {filteredPeleadores.length > 5 && (
                  <p className="text-center text-gray-400 text-sm mt-2">
                    Muestra 5 resultados. Usa el buscador para encontrar más.
                  </p>
                )}
              </div>
            ) : (
              <div className="animate-fade-in-up">
                <div className="bg-white rounded-xl p-4 flex items-center justify-between border-2 border-blue-500 shadow-md mb-6 relative overflow-hidden">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                      <img
                        src={`https://ui-avatars.com/api/?name=${selectedPeleador.nombre}&background=0D8ABC&color=fff`}
                        alt={selectedPeleador.nombre}
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-blue-900 text-lg">
                        {selectedPeleador.nombre} "{selectedPeleador.apodo}"
                      </h4>
                      <p className="text-sm text-gray-500">Seleccionado</p>
                    </div>
                  </div>
                  <div className="bg-blue-500 text-white rounded-full p-2">
                    <FiCheckCircle size={24} />
                  </div>
                </div>

                <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 mb-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-10">
                    <FaTrophy size={100} />
                  </div>
                  <h3 className="text-2xl font-black text-blue-900 mb-1 relative z-10">
                    Categoría detectada: {categoriaDetectada}
                  </h3>
                  <p className="text-blue-700 mb-6 relative z-10">
                    El sistema ha validado los datos del perfil automáticamente.
                  </p>

                  <div className="grid grid-cols-3 gap-4 relative z-10">
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <p className="text-xs font-bold text-gray-400 mb-1">
                        PESO
                      </p>
                      <p className="text-xl font-black text-gray-800">
                        {selectedPeleador.peso}kg
                      </p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <p className="text-xs font-bold text-gray-400 mb-1">
                        DIVISIÓN
                      </p>
                      <p className="text-xl font-black text-gray-800">
                        {selectedPeleador.nivel}
                      </p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <p className="text-xs font-bold text-gray-400 mb-1">
                        EDAD
                      </p>
                      <p className="text-xl font-black text-gray-800">
                        {selectedPeleador.edad || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mb-6">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                    Modificación de Categoría
                  </p>
                  <select
                    value={overrideCategoria}
                    onChange={(e) => setOverrideCategoria(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl p-4 text-gray-800 font-bold focus:ring-2 focus:ring-blue-500 outline-none shadow-sm mb-3"
                  >
                    <option value={categoriaDetectada}>
                      {categoriaDetectada} (Recomendada)
                    </option>
                    <option value="Peso Ligero">Peso Ligero (hasta 68kg)</option>
                    <option value="Peso Intermedio">Peso Intermedio (hasta 79kg)</option>
                    <option value="Peso Pesado">Peso Pesado (+80kg)</option>
                    <option value="Categoría Especial">
                      Categoría Especial
                    </option>
                  </select>

                  {overrideCategoria !== categoriaDetectada && (
                    <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl text-sm font-medium">
                      Nota: Los cambios manuales requieren una re-validación por
                      parte del comité técnico durante el pesaje oficial.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="fixed bottom-0 left-0 w-full bg-white border-t p-4 flex justify-end gap-4 px-6 md:px-20 z-20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <Button
              variant="secondary"
              onClick={() => {
                setShowModal(false);
                setSelectedPeleador(null);
              }}
            >
              CANCELAR
            </Button>
            <button
              onClick={handleInscribir}
              disabled={!selectedPeleador}
              className={`px-8 py-3 rounded-lg font-bold text-white transition-colors ${selectedPeleador ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-300 cursor-not-allowed"}`}
            >
              GUARDAR INSCRIPCIÓN
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
