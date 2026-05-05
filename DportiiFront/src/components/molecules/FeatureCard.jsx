export const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-[#F8F9FB] p-10 rounded-3xl">
      <div className="text-blue-600 mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-[#0B1B3D] mb-3">{title}</h3>
      <p className="text-slate-500 leading-relaxed text-sm">
        {description}
      </p>
    </div>
  );
};