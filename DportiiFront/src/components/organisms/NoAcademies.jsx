import { FiShield } from 'react-icons/fi';
import { Button } from '../atoms/Button'; 

export const NoAcademies = ({ onAddClick }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 text-center bg-white p-12 rounded-2xl shadow-sm border border-gray-100 mt-10">
      <div className="bg-blue-50 p-6 rounded-full text-blue-300">
        <FiShield size={64} />
      </div>
      <div className="flex flex-col gap-2 max-w-sm">
        <h2 className="text-2xl font-bold text-blue-950">Sin academias registradas</h2>
        <p className="text-gray-600">
          Agrega las academias o dojos participantes para poder asignarles peleadores más adelante.
        </p>
      </div>
      <Button variant="primary" onClick={onAddClick}>
        Registrar Academia
      </Button>
    </div>
  );
};