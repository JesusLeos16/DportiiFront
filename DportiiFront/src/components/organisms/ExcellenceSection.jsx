import { BenefitItem } from '../molecules/BenefitItem';

export const ExcellenceSection = () => {
  return (
    <section id="beneficios" className="max-w-7xl mx-auto px-8 py-24 flex flex-col lg:flex-row items-center gap-16">
      <div className="flex-1 w-full">
        <div className="bg-[#0B131F] w-full h-400px rounded-[2.5rem] shadow-xl overflow-hidden flex items-center justify-center">
           <img src="../../public/pelao.png" alt="" />
        </div>
      </div>
      
      <div className="flex-1 space-y-8">
        <h2 className="text-4xl font-extrabold text-[#0B1B3D]">Diseñado para la Excelencia</h2>
        <div className="space-y-6">
          <BenefitItem 
            title="Profesionalismo Absoluto" 
            description="Proyecta una imagen de élite ante tus participantes y patrocinadores." 
          />
          <BenefitItem 
            title="Eficiencia Operativa" 
            description="Reduce el tiempo de gestión administrativa en un 60%." 
          />
          <BenefitItem 
            title="Escalabilidad Ilimitada" 
            description="Desde torneos locales hasta circuitos internacionales." 
          />
        </div>
      </div>
    </section>
  );
};