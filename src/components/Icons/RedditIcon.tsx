import React from 'react';

interface RedditIconProps {
  className?: string;
}

const RedditIcon = ({ className = "h-5 w-5" }: RedditIconProps) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      {/* Main circle */}
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 1.5c4.69 0 8.5 3.81 8.5 8.5 0 4.69-3.81 8.5-8.5 8.5-4.69 0-8.5-3.81-8.5-8.5 0-4.69 3.81-8.5 8.5-8.5z" />
      
      {/* Antenna */}
      <path d="M14.99 9.5c-.67 0-1.21-.54-1.21-1.21 0-.67.54-1.21 1.21-1.21.67 0 1.21.54 1.21 1.21 0 .67-.54 1.21-1.21 1.21z" />
      <path d="M15 7.08c.14-1.45 1.35-2.58 2.83-2.58.31 0 .61.05.89.15l.48-2.39c.06-.31.35-.51.66-.45.31.06.51.35.45.66l-.48 2.39c.84.46 1.41 1.35 1.41 2.37 0 1.5-1.22 2.71-2.71 2.71-.31 0-.61-.05-.89-.15" />
      
      {/* Eyes */}
      <circle cx="9.33" cy="12" r="1.66" />
      <circle cx="14.66" cy="12" r="1.66" />
      
      {/* Face outline */}
      <path d="M12 17.17c-2.83 0-5.13-1.45-5.13-3.24 0-1.79 2.3-3.24 5.13-3.24 2.83 0 5.13 1.45 5.13 3.24 0 1.79-2.3 3.24-5.13 3.24z" />
      
      {/* Mouth */}
      <path d="M12 15.75c-1.79 0-3.24-1.45-3.24-3.24 0-1.79 1.45-3.24 3.24-3.24 1.79 0 3.24 1.45 3.24 3.24 0 1.79-1.45 3.24-3.24 3.24z" />
      
      {/* Ears */}
      <path d="M7.5 11.5c-.83-.83-1.34-1.98-1.34-3.25 0-2.54 2.07-4.61 4.61-4.61" />
      <path d="M16.5 11.5c.83-.83 1.34-1.98 1.34-3.25 0-2.54-2.07-4.61-4.61-4.61" />
    </svg>
  );
};

export default RedditIcon; 