import React from 'react';
import { RESUME } from '../data';
import { motion } from 'framer-motion';

export const ExperienceLog = () => {
  return (
    <div className="relative border-l border-white/10 ml-4 md:ml-0 space-y-16">
      {RESUME.experience.map((job, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: idx * 0.1 }}
          className="relative pl-8 md:pl-16"
        >
          {/* Timeline Dot */}
          <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-black" />

          <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-4">
            <h3 className="text-2xl font-semibold text-white">{job.role}</h3>
            <span className="text-text-secondary font-mono text-sm">{job.period}</span>
          </div>
          
          <div className="text-lg text-primary mb-6 font-medium">
            {job.company} <span className="text-text-secondary font-normal">| {job.location}</span>
          </div>

          <p className="text-text-secondary mb-6 leading-relaxed max-w-4xl">
            {/* We take the first detail as a summary if needed, or just list them all cleanly */}
            <ul className="space-y-3">
              {job.details.map((detail, dIdx) => (
                <li key={dIdx} className="flex items-start gap-3">
                    <span className="block mt-2 w-1.5 h-1.5 rounded-full bg-white/20 flex-shrink-0"></span>
                    <span>{detail}</span>
                </li>
              ))}
            </ul>
          </p>

          <div className="flex flex-wrap gap-2">
            {job.tech.map((t, tIdx) => (
              <span 
                key={tIdx} 
                className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 border border-white/10 text-text-secondary"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};