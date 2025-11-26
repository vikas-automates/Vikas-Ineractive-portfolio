import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface BootSequenceProps {
  onComplete: () => void;
}

const lines = [
  "INITIALIZING KERNEL...",
  "LOADING DRIVERS... [OK]",
  "MOUNTING FILESYSTEM... [OK]",
  "CONNECTING TO NEURAL LINK...",
  "DOWNLOADING PROFILE: VIKAS_KUMAR...",
  "CONFIGURING TAILWIND RENDERER...",
  "ESTABLISHING SECURE CONNECTION...",
  "ACCESS GRANTED."
];

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    if (currentLine < lines.length) {
      const timeout = setTimeout(() => {
        setCurrentLine(prev => prev + 1);
      }, Math.random() * 300 + 100); // Random delay for realism
      return () => clearTimeout(timeout);
    } else {
      const finishTimeout = setTimeout(onComplete, 800);
      return () => clearTimeout(finishTimeout);
    }
  }, [currentLine, onComplete]);

  return (
    <div className="h-full w-full flex flex-col items-start justify-end p-8 font-mono text-green-500 bg-black z-50 absolute top-0 left-0">
      {lines.slice(0, currentLine + 1).map((line, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-2 text-lg md:text-xl tracking-wider"
        >
          <span className="mr-2 text-green-700">{`>`}</span>
          {line}
        </motion.div>
      ))}
      <div className="animate-pulse mt-4 bg-green-500 h-6 w-4 inline-block"></div>
    </div>
  );
};