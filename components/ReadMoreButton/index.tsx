import React from 'react';
import { MdOutlineArrowRightAlt } from "react-icons/md";

const ReadMoreButton = ({ forceDark = false }) => {
  const wrapperClass = forceDark ? "dark" : "";
  
  return (
    <div className={`flex items-center !mt-6 ${wrapperClass}`}>
      <button className="group relative flex items-center">
        <div className="z-[2] relative border border-gray-300 dark:border-gray-300 hover:border-transparent flex items-center justify-center w-14 h-14 rounded-full bg-white dark:bg-dark group-hover:bg-pink dark:group-hover:bg-dark transition-all duration-300 mr-2 dark:hover:bg-dark">
          <MdOutlineArrowRightAlt className="w-4 h-4 text-gray-800 dark:text-white group-hover:text-white transition-colors duration-300" />
        </div>
        <div className="relative -ml-[27px]">
          <span className="relative z-[3] bg-transparent block py-2 transition-colors duration-300 tracking-widest text-gray-800 dark:text-white">
            <span className="invisible">Re</span>ad More
          </span>
          <span className="absolute left-0 top-0 z-[3] bg-transparent block py-2 transition-colors duration-300 tracking-widest text-gray-800 dark:text-white">
            <span className="group-hover:text-white transition-colors duration-300">Re</span>
          </span>
        </div>
      </button>
    </div>
  );
};

export default ReadMoreButton;