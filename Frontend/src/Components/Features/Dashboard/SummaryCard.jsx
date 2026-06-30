import React from "react";

const SummaryCard = ({ summary }) => {
  const { id, title, value, subtitle, trend, icon } = summary;
  return (
    <div className="h-[200px] w-[200px] bg-amber-300 flex p-3 flex-col gap-[20px]">
      <div className="flex justify-around w-full h-5 ">
        <icon className="bg-pink-300 w-[60px]" />
        <h1>...</h1>
      </div>
      <div className="text-black text-2xl">
        <h1>{title}: </h1>
        <h1>{value}</h1>
      </div>
      <div>
        <h1 className="text-xl text-green-200">{trend}</h1>
        <h1 className="text-black">{subtitle}</h1>
      </div>
    </div>
  );
};

export default SummaryCard;
