// Updated BurgerIcon component
import React from 'react';
import { useTheme } from 'next-themes';

interface BurgerIconProps {
  forceDarkMode?: boolean;
}

const BurgerIcon = ({ forceDarkMode = false }: BurgerIconProps) => {
  const { resolvedTheme } = useTheme();
  
  // Use forceDarkMode to override theme logic
  const isDarkMode = forceDarkMode || resolvedTheme === 'dark';
  const fillColor = isDarkMode ? '#FFFFFF' : '#131939';
  
  return (
    <svg
      width="22"
      height="12"
      viewBox="0 0 22 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="22" height="2" rx="1" fill={fillColor}/>
      <rect y="5" width="22" height="2" rx="1" fill={fillColor}/>
      <path d="M6.11133 11C6.11133 10.4477 6.55904 10 7.11133 10H21.0002C21.5525 10 22.0002 10.4477 22.0002 11V11C22.0002 11.5523 21.5525 12 21.0002 12H7.11133C6.55904 12 6.11133 11.5523 6.11133 11V11Z" fill={fillColor}/>
    </svg>
  );
};

export default BurgerIcon;