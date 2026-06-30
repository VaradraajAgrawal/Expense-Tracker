import React from "react";

const Prac = ({ data }) => {
  const { title, author, id } = data;
  return (
    <div className="flex gap-5 items-center justify-center w-[260px] h-[380px] ">
      <div key={id} className="flex items-center">
        <div className="bg-cyan-200 flex  p-2 rounded-2xl flex-col justify-center items-center gap-5 shadow-md w-[260px] h-[380px]">
          <h1 className="text-2xl bg-amber-50 w-[260px] text-center font-semibold">
            Product Card
          </h1>
          <h1 className="font-black text-2xl">{title}</h1>
          <h1 className="text-black text-xl">{`${author}`}</h1>
        </div>
      </div>
    </div>
  );
};

export default Prac;
