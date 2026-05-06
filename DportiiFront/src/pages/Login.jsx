import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginRequest } from "../api/authApi";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    try {
      const data = await loginRequest(email, password);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/torneos");
    } catch (error) {
      setMensaje(
        error.response?.data?.error ||
          "Error al iniciar sesión. Verifica tus credenciales.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 grid grid-cols-1 md:grid-cols-2">
      <div className=" hidden md:flex flex-col justify-end bg-zinc-900 p-12 lg:p-20 relative overflow-hidden">
        <div
          className="absolute inset-0  bg-cover bg-center "
          style={{ backgroundImage: "url('../../public/screenDo.png')" }}
        ></div>

        <div className="relative z-10">
          <h2 className="text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            Lo mejor para tus <br /> eventos.
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed max-w-md">
            Organiza tus torneos con la plataforma de gestión deportiva más
            avanzada. Control total, resultados profesionales.
          </p>
          <a
            href="/"
            className="mt-8 inline-block text-sm font-bold text-blue-500 hover:text-blue-200 transition-colors tracking-wide"
          >
            ← Volver a pagina de inicio
          </a>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="bg-white p-8 sm:p-12 rounded-4XL shadow-xl shadow-blue-900/5 w-full max-w-md">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-2">
              <div className="w-6 h-6 rounded-sm">
                <img src="../../public/favi2.png" alt="Dportii Logo" />
              </div>
              <span className="text-xl font-extrabold text-blue-950 tracking-tight">
                Dportii
              </span>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
              Bienvenido de nuevo
            </h2>
            <p className="text-gray-500 text-sm font-medium">
              Inicia sesión para gestionar tus torneos.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                Correo electrónico
              </label>
              <input
                type="email"
                placeholder="ejemplo@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3.5 rounded-xl bg-gray-100/80 border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-800 placeholder-gray-400 outline-none font-medium"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest">
                  Contraseña
                </label>
                <button
                  href="#"
                  onClick={() => alert("Ps que mal pedo JJASJAJSJAJSA.")}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors tracking-wide"
                >
                  ¿OLVIDASTE LA CONTRASEÑA?
                </button>
              </div>
              <input
                type="password"
                placeholder="contrasenasupersecreta69"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3.5 rounded-xl bg-gray-100/80 border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-800 placeholder-gray-400 outline-none font-medium"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-xl transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 mt-4 active:scale-[0.98]"
            >
              Entrar
            </button>
          </form>
          {mensaje && (
            <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-xl">
              <p className="text-sm text-center text-red-600 font-bold">
                {mensaje}
              </p>
            </div>
          )}
          <div className="mt-10 text-center text-sm text-gray-500 font-medium">
            ¿No tienes una cuenta?{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:text-blue-800 font-bold transition-colors"
            >
              Regístrate
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
