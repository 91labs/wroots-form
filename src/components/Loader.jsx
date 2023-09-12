import React from 'react';
import { BiLoader } from 'react-icons/bi';

const Loader = ({ color = 'fill-primary-500 ' }) => {
  return (
    <div className="flex items-center justify-center w-full pt-10">
      <BiLoader size={30} className={`${color} animate-spin`} />
    </div>
  );
};

export const LoaderSpin = ({ className, size = 20 }) => (
  <BiLoader size={size} className={`animate-spin ${className}`} />
);

export const FullScreenLoader = ({ className, size = 30 }) => (
  <div className="fixed z-60 inset-0 bg-gray-900/60 flex justify-center items-center">
    <BiLoader
      size={size}
      className={`animate-spin ${className}`}
      color="white"
    />
  </div>
);

export default Loader;
