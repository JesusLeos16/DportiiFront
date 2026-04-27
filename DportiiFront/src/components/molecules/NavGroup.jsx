export const NavGroup = () => {
  const links = ['TORNEO', 'PARTICIPANTES', 'COMBATE', 'MATCHUP', 'ACADEMIAS'];

  return (
    <div className="flex justify-center gap-10 py-3 border-b border-gray-100">
      {links.map((link, index) => (
        <span 
          key={index} 
          className="text-sm text-gray-400 font-bold tracking-widest cursor-pointer hover:text-blue-700 transition-colors"
        >
          {link}
        </span>
      ))}
    </div>
  );
};