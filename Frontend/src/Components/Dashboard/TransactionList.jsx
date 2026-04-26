const TransactionList = () => {
  const dummyData = [
    { id: 1, name: "Meat Supply", amount: -500, category: "Food" },
    { id: 2, name: "Bounty Reward", amount: 2000, category: "Salary" },
    { id: 3, name: "Ship Repairs", amount: -1200, category: "Maintenance" },
  ];

  return (
    <ul className="space-y-4">
      {dummyData.map((item) => (
        <li
          key={item.id}
          className="flex justify-between items-center p-3 bg-white/50 rounded border-l-4 border-[#e67e22]"
        >
          <div>
            <p className="font-bold">{item.name}</p>
            <p className="text-xs text-[#95a5a6]">{item.category}</p>
          </div>
          <span
            className={`font-bold ${item.amount < 0 ? "text-red-500" : "text-green-600"}`}
          >
            {item.amount < 0 ? "-" : "+"} ฿{Math.abs(item.amount)}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default TransactionList;
