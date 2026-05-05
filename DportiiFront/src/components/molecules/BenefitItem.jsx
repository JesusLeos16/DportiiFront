import { FiCheckCircle } from 'react-icons/fi';

export const BenefitItem = ({ title, description }) => {
  return (
    <div className="flex gap-4">
      <FiCheckCircle className="text-blue-600 w-6 h-6 shrink-0 mt-1" />
      <div>
        <h4 className="font-bold text-[#0B1B3D]">{title}</h4>
        <p className="text-sm text-slate-500 mt-1">{description}</p>
      </div>
    </div>
  );
};