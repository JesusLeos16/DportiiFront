import { FeatureCard } from "../molecules/FeatureCard";
import { RiOrganizationChart } from "react-icons/ri";
import { TbEaseInOutControlPoints } from "react-icons/tb";
import { TbTopologyStar3 } from "react-icons/tb";


export const FeaturesGrid = () => {
  return (
    <section id="caracteristicas" className="max-w-7xl mx-auto px-8 py-24">
      <h2 className="text-3xl font-extrabold text-[#0B1B3D] mb-12">
        Todo lo que necesitas para tu evento
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        <FeatureCard
          icon={<RiOrganizationChart size={45}/>}
          title="Gestión de Torneos"
          description="Organiza llaves, horarios y resultados en tiempo real. Un sistema fluido que se adapta a competiciones de cualquier escala."
        />
        <FeatureCard
          icon={<TbEaseInOutControlPoints size={45}/>}
          title="Control de Participantes"
          description="Directorio centralizado de atletas, registros rápidos y seguimiento de estados de salud."
        />
        <FeatureCard
          icon={<TbTopologyStar3 size={45}/>}
          title="Matchmaking Inteligente"
          description="Generación automática de llaves y emparejamientos equitativos basados en algoritmos avanzados."
        />
      </div>
    </section>
  );
};
