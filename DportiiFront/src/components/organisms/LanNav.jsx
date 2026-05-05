export const LanNav = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-sm"><img src="../../public/favi2.png" alt="Dportii Logo" /></div>
        <span className="text-xl font-extrabold text-blue-950 tracking-tight">Dportii</span>
      </div>
      
      <div className="hidden md:flex gap-8 text-sm font-medium text-slate-500">
        <a href="#caracteristicas" className="hover:text-blue-600 transition-colors">Características</a>
        <a href="#beneficios" className="hover:text-blue-600 transition-colors">Beneficios</a>
        <a href="#testimonios" className="hover:text-blue-600 transition-colors">Testimonios</a>
      </div>

      <button className="text-sm font-semibold text-slate-300 hover:text-blue-600 transition-colors">
        <a href="registro">COMENZAR</a>
      </button>
    </nav>
  );
};