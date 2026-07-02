import React from "react";

const SummaryCard = ({ summary }) => {
  const { id, title, value, trend, subtitle } = summary;
  const Icon = summary.icon;
  return (
    <>
      <div key={id} className="flex-col gap-[20px] flex w-full h-full">
        <div className="flex justify-between w-full h-5 p-2">
          <Icon />
          <h1 className="text-black">...</h1>
        </div>

        <div className="text-black text-2xl">
          <h1>{title}: </h1>
          <h1>{value}</h1>
        </div>

        <div>
          <h1 className="text-xl text-green-700 font-semibold">{trend}</h1>
          <h1 className="text-black text-sm">{subtitle}</h1>
        </div>
      </div>
    </>
  );
};

export default SummaryCard;
