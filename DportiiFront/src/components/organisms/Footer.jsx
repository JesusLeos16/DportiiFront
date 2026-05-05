export const Footer = () => {
  return (
    <>
      <section className="bg-[#F4F5F7] py-32 text-center px-8 border-b border-gray-200">
        <h2 className="text-5xl font-extrabold text-[#0B1B3D] mb-8 tracking-tight">
          Lleva tu organización al <br className="hidden md:block"/> siguiente nivel.
        </h2>
        <a href="/registro" className="px-10 py-4 bg-white text-slate-700 font-bold rounded-2xl shadow-sm border border-gray-100 hover:bg-gray-50 transition-all">
          Prueba Gratis
        </a>
      </section>

      <footer className="bg-[#F4F5F7] px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="font-bold text-slate-900">Dportii</span>
          <span className="text-xs text-slate-500">&copy; 2024 Dportii. Construido con amor por el kikin.</span>
        </div>
        
      </footer>
    </>
  );
};