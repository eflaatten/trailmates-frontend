import React from "react";

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div
      className='flex items-center justify-center p-12 h-full w-full'
      style={{ backgroundColor: "#181C1F" }}
    >
      <div className='max-w-lg text-center'>
        <div className='grid grid-cols-3 gap-6 mb-12'>
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl bg-indigo-500/10 ${
                i % 2 === 0 ? "animate-pulse" : ""
              }`}
              style={{ width: "150px", height: "150px" }}
            />
          ))}
        </div>
        <h2 className='text-3xl font-bold mb-6 text-white'>{title}</h2>
        <p className='text-gray-400'>{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
