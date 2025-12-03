import React from 'react';
import { RESUME } from '../data';
import { motion } from 'framer-motion';
import { BadgeCheck, Trophy, ExternalLink } from 'lucide-react';

export const Certifications = () => {
  return (
    <div className="space-y-16">
      
      {/* Certifications Section */}
      <div>
        <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <BadgeCheck size={24} />
            </div>
            <h3 className="text-2xl font-semibold text-white">Certifications</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {RESUME.certifications.map((cert, idx) => {
                const CardContent = () => (
                    <>
                    <div className="mt-1 text-primary/60 group-hover:text-primary transition-colors">
                        <BadgeCheck size={20} />
                    </div>
                    <div>
                        <h4 className="font-medium text-white group-hover:text-primary transition-colors">{cert.name}</h4>
                        <p className="text-sm text-text-secondary mt-1">{cert.issuer}</p>
                    </div>
                    </>
                );

                if (cert.url) {
                    return (
                        <a 
                            key={idx}
                            href={cert.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative flex items-start gap-4 p-5 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer overflow-hidden"
                        >
                            <CardContent />
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span className="text-primary font-medium flex items-center gap-2">
                                    Verify Credential <ExternalLink size={14} />
                                </span>
                            </div>
                        </a>
                    )
                }

                return (
                    <motion.div 
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className="group flex items-start gap-4 p-5 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors"
                    >
                        <CardContent />
                    </motion.div>
                );
            })}
        </div>
      </div>

      {/* Achievements Section */}
      <div>
        <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-500">
                <Trophy size={24} />
            </div>
            <h3 className="text-2xl font-semibold text-white">Key Achievements</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {RESUME.achievements.map((item, idx) => (
                <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6 hover:border-white/20 transition-all"
                >
                    <div className="relative z-10">
                        <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                        <p className="text-text-secondary leading-relaxed">{item.description}</p>
                    </div>
                    <div className="absolute -bottom-4 -right-4 text-white/5 rotate-12">
                        <Trophy size={80} />
                    </div>
                </motion.div>
            ))}
        </div>
      </div>

    </div>
  );
};