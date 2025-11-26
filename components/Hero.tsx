import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export const Hero = () => {
  return (
    <div className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none opacity-50 animate-pulse" />

      <div className="max-w-5xl mx-auto px-6 text-center z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <span className="inline-block py-1 px-3 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-primary mb-6 backdrop-blur-md">
            Senior QA Automation Analyst
          </span>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-8xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Vikas Kumar
        </motion.h1>

        <motion.p
          className="text-xl md:text-3xl text-text-secondary max-w-3xl mx-auto leading-relaxed font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Architecting scalable test automation frameworks and AI-augmented CI/CD pipelines.
        </motion.p>
        
        <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 1, delay: 0.8 }}
             className="mt-12 flex justify-center gap-4"
        >
            <button 
                onClick={() => document.getElementById('highlights')?.scrollIntoView({ behavior: 'smooth'})}
                className="bg-white text-black hover:bg-gray-200 px-8 py-3 rounded-full font-medium transition-all transform hover:scale-105"
            >
                View Work
            </button>
             <button 
                onClick={() => window.open('https://www.linkedin.com', '_blank')}
                className="bg-white/10 hover:bg-white/20 px-8 py-3 rounded-full font-medium transition-all backdrop-blur-sm"
            >
                LinkedIn
            </button>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ChevronDown size={32} />
      </motion.div>
    </div>
  );
};