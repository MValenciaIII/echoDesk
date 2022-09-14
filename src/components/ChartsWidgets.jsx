import React from 'react';

export default function ChartsWidget({ category, number }) {
  return (
    <div className="w-32 p-6 mx-2 font-bold text-center rounded-md shadow-md md:w-44 bg-off-base-lighter text-text-base">
      <p>{category}</p>
      <p>{number}</p>
    </div>
  );
}
