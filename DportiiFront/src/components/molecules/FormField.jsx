import { Input } from "../atoms/Input";

export const FormField = ({ label, type, placeholder }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2">{label}</label>
      <Input type={type} placeholder={placeholder} />
    </div>
  );
};
