export const HeroElite = () => {
  return (
    <section className="relative max-w-7xl mx-auto px-8 py-20 lg:py-32 flex flex-col lg:flex-row items-center gap-16">
      <div className="absolute top-0 right-0 w-800px h-800px bg-blue-50/50 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/4"></div>

      <div className="flex-1 space-y-8 z-10">
        <h1 className="text-5xl lg:text-[4rem] leading-[1.05] font-extrabold text-[#0B1B3D] tracking-tight">
          Gestión Elite para Competiciones de Alto Nivel
        </h1>
        <p className="text-lg text-slate-500 max-w-lg leading-relaxed">
          La plataforma definitiva para organizar torneos, gestionar atletas y controlar tus finanzas en un solo lugar.
        </p>
        <a href="/registro" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl shadow-sm border border-blue-600 transition-all">
          Comenzar Ahora
        </a>
      </div>

      <div className="flex-1 w-full relative">
        <div className="bg-slate-300 p-4 lg:p-6 rounded-4xl shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
          <div className="bg-white rounded-xl h-300px lg:h-400px w-full overflow-hidden shadow-inner flex items-center justify-center text-slate-300">
                <img src="../../../public/hero.png" alt="imagen de torneo artes marciales" />
          </div>
        </div>
      </div>
    </section>
  );
};