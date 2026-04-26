const SummaryCard = ({ title, amount, color, label }) => {
  return (
    <div className="bg-[#fff9eb] border-2 border-[#d4c49c] rounded-xl p-6 shadow-md transition-transform hover:scale-105">
      <h3 className="text-sm uppercase tracking-tighter text-[#7f8c8d] mb-1">
        {title}
      </h3>
      <div className={`text-3xl font-black ${color}`}>
        ฿ {amount.toLocaleString()}
      </div>
      <p className="text-xs mt-2 text-[#95a5a6] uppercase font-bold">{label}</p>
    </div>
  );
};

export default SummaryCard;
