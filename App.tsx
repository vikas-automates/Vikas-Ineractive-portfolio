
import React from 'react';
import { Hero } from './components/Hero';
import { ExperienceLog } from './components/ExperienceLog';
import { BentoGrid } from './components/BentoGrid';
import { ProjectShowcase } from './components/ProjectShowcase';
import { Certifications } from './components/Certifications';
import { Footer } from './components/Footer';
import { motion, useScroll, useSpring } from 'framer-motion';

const App = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen w-full bg-background text-text selection:bg-primary selection:text-white overflow-hidden">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
        style={{ scaleX }}
      />

      {/* Navigation (Simple Sticky) */}
      <nav className="fixed top-0 w-full z-40 glass-panel border-b-0 border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="font-semibold text-lg tracking-tight">Vikas Kumar</div>
          <div className="flex gap-6 items-center">
            <button 
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth'})}
                className="text-sm font-medium text-text-secondary hover:text-white transition-colors"
            >
                Projects
            </button>
            <a 
                href="mailto:vkvikaskumar447@gmail.com"
                className="text-sm font-medium text-text-secondary hover:text-white transition-colors"
            >
                Contact
            </a>
          </div>
        </div>
      </nav>

      <main className="relative z-10 w-full">
        <Hero />
        
        <div className="max-w-6xl mx-auto px-6 py-24 space-y-32">
          
          <section id="highlights">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Expertise & Highlights.</h2>
              <p className="text-xl text-text-secondary max-w-2xl">
                Combining architectural vision with hands-on automation to accelerate delivery.
              </p>
            </motion.div>
            <BentoGrid />
          </section>

          <section id="projects">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Automation Showcase.</h2>
              <p className="text-xl text-text-secondary max-w-2xl mb-8">
                Explore a live representation of a robust Playwright automation framework, featuring Page Object Model architecture, CI/CD integration, and Reporting.
              </p>
              <ProjectShowcase />
            </motion.div>
          </section>

          <section id="certifications">
             <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Certifications & Achievements.</h2>
              <p className="text-xl text-text-secondary max-w-2xl">
                Recognized credentials and impact-driven results throughout my career.
              </p>
            </motion.div>
            <Certifications />
          </section>

          <section id="experience">
             <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Professional Journey.</h2>
              <p className="text-xl text-text-secondary max-w-2xl">
                A track record of leadership in QA Automation across Automotive, Financial, and Manufacturing sectors.
              </p>
            </motion.div>
            <ExperienceLog />
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
