import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerRequest } from "../api/authApi";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    try {
      await registerRequest(name, email, password);
      if (!name.trim() || !email.trim() || !password.trim()) {
        setMensaje("Por favor completa todos los campos");
        return;
      }
      setMensaje("¡Registro exitoso! Redirigiendo al inicio de sesión...");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setMensaje(
        error.response?.data?.error ||
          "Error al crear la cuenta. Inténtalo de nuevo.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 grid grid-cols-1 md:grid-cols-2">
      <div className="md:flex flex-col items-center justify-center bg-zinc-800 md:p-16 p-8 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-40 bg-cover bg-center"
          style={{ backgroundImage: "url('../../public/screen.jpg')" }}
        ></div>

        <div className="gap-2 relative z-10 text-center md:text-left">
          <h2 className="text-4xl font-extrabold text-white mb-6">
            Eleva tu juego con Dportii. <br /> Gestión deportiva sin límites.
          </h2>
          <p className="text-blue-100 text-lg leading-relaxed">
            Unete a Dportii hoy y experimenta la revolución en la gestión de
            eventos deportivos. Control total, resultados profesionales.
          </p>
          <a
            href="/"
            className="mt-8 inline-block text-sm font-bold text-blue-500 hover:text-blue-200 transition-colors tracking-wide"
          >
            ← Volver a pagina de inicio
          </a>
        </div>
      </div>
      <div className="bg-white p-8 sm:p-10 flex flex-col justify-center rounded-4xl shadow-xl">
        <div className="w-full max-w-md mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-center gap-2">
              <div className="flex items-center justify-center gap-2">
                <div className="w-6 h-6 rounded-sm">
                  <img src="../../public/favi2.png" alt="Dportii Logo" />
                </div>
                <h2 className="text-2xl font-extrabold text-blue-950 tracking-tight">
                  Dportii
                </h2>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <h2 className="text-3xl font-extrabold text-blue-950 mt-2">
                Crea tu cuenta
              </h2>
              <p className="text-gray-600 font-medium mt-2">
                Introduce tus datos para comenzar.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <input
              type="text"
              placeholder="Nombre completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-gray-700 placeholder-gray-400"
            />
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-gray-700 placeholder-gray-400"
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-gray-700 placeholder-gray-400"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-sm mt-2 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              Crear Cuenta <span className="text-xl">→</span>
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-600 font-medium">
            ¿Ya tienes una cuenta?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-700 font-semibold flex items-center justify-center gap-1"
            >
              Inicia sesión <span className="text-lg">→</span>
            </Link>
          </div>

          {mensaje && (
            <div
              className={`mt-6 p-3 ${mensaje.includes("exitoso") ? "bg-green-50 border border-green-100" : "bg-red-50 border border-red-100"} rounded-xl`}
            >
              <p
                className={`text-sm text-center ${mensaje.includes("exitoso") ? "text-green-700" : "text-red-600"} font-medium`}
              >
                {mensaje}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
