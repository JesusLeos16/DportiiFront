import { Select } from "../atoms/select";
export const SelectField = ({ label, options, ...props }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2">{label}</label>
      <Select options={options} {...props} />
    </div>
  );
};
