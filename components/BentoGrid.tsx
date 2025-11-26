import React from 'react';
import { RESUME } from '../data';
import { SkillRadar } from './SkillRadar';
import { motion } from 'framer-motion';
import { Cpu, Zap, Layers, GitBranch, Database, Award } from 'lucide-react';

const icons = {
    "Efficiency Boost": <Zap size={24} className="text-yellow-400" />,
    "Velocity Increase": <Cpu size={24} className="text-primary" />,
    "Regression Cut": <Layers size={24} className="text-green-400" />,
    "Migration Lead": <GitBranch size={24} className="text-purple-400" />
};

export const BentoGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]">
      
      {/* Skill Radar - Large Card */}
      <motion.div 
        className="md:col-span-2 row-span-2 glass-panel rounded-3xl p-6 md:p-8 flex flex-col relative overflow-hidden group"
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative z-10 flex flex-col h-full">
            <h3 className="text-2xl font-bold mb-2">Technical Proficiency</h3>
            <p className="text-text-secondary mb-6 max-w-md">
                Expertise balanced between core automation frameworks, modern DevOps practices, and emerging AI technologies.
            </p>
            <div className="flex-1 min-h-[300px]">
                <SkillRadar />
            </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] group-hover:bg-primary/20 transition-all duration-500" />
      </motion.div>

      {/* Certifications - Tall Card */}
      <motion.div 
        className="glass-panel rounded-3xl p-6 md:p-8 flex flex-col justify-between group"
         whileHover={{ scale: 1.01 }}
         transition={{ duration: 0.3 }}
      >
         <div>
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-4 text-white">
                <Award size={20} />
            </div>
            <h3 className="text-xl font-bold mb-4">Certifications</h3>
            <ul className="space-y-4">
                {RESUME.certifications.slice(0, 3).map((cert, idx) => (
                    <li key={idx} className="border-l-2 border-white/10 pl-3">
                        <div className="text-sm font-semibold text-white">{cert.name}</div>
                        <div className="text-xs text-text-secondary">{cert.issuer}</div>
                    </li>
                ))}
            </ul>
         </div>
      </motion.div>

      {/* Stats Cards */}
      {RESUME.achievements.map((ach, idx) => (
        <motion.div 
            key={idx}
            className="glass-panel rounded-3xl p-6 flex flex-col justify-between group overflow-hidden"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
        >
             <div className="absolute top-0 right-0 p-6 opacity-50 group-hover:opacity-100 transition-opacity">
                {icons[ach.title as keyof typeof icons] || <Award />}
             </div>
             <div className="mt-8">
                 <h4 className="text-3xl font-bold text-white mb-2 tracking-tight">
                    {ach.description.match(/\d+%|3X/) ? ach.description.match(/\d+%|3X/)?.[0] : "Key"}
                 </h4>
                 <div className="text-sm font-medium text-text-secondary uppercase tracking-wider">{ach.title}</div>
                 <p className="text-sm text-text-secondary mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {ach.description}
                 </p>
             </div>
        </motion.div>
      ))}

        {/* Tech Stack Horizontal */}
       <motion.div 
        className="md:col-span-3 glass-panel rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6"
        whileHover={{ scale: 1.01 }}
       >
           <div className="text-left">
               <h3 className="text-2xl font-bold">Core Stack</h3>
               <p className="text-text-secondary text-sm">Technologies used daily in production environments.</p>
           </div>
           <div className="flex flex-wrap gap-3 justify-center md:justify-end">
               {['Playwright', 'TypeScript', 'Docker', 'AWS', 'GitLab CI', 'Java', 'Selenium'].map((tech) => (
                   <span key={tech} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 transition-colors cursor-default">
                       {tech}
                   </span>
               ))}
           </div>
       </motion.div>

    </div>
  );
};