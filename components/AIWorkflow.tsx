import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Bot, Users, ShieldCheck, Search, GitMerge } from 'lucide-react';

interface Stage {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const STAGES: Stage[] = [
  {
    title: "Story Kickoff",
    description: "The product owner breaks the story down with AI assistance. Architecture and test-strategy decisions were agreed up front for the whole pilot, before development ever started.",
    icon: <FileText size={20} />,
  },
  {
    title: "Agent Orchestration",
    description: "The developer hands the story to an orchestrator agent, which coordinates specialized agents to build the feature end-to-end — UI, API, and the accompanying unit, integration, and E2E tests.",
    icon: <Bot size={20} />,
  },
  {
    title: "Human Review",
    description: "A peer developer and I, as QA, review the resulting merge request — adding stable locators and selectors wherever the agent-generated tests need them.",
    icon: <Users size={20} />,
  },
  {
    title: "CI Gate",
    description: "Automated checks run pre-merge, then the change promotes to a shared QA environment.",
    icon: <ShieldCheck size={20} />,
  },
  {
    title: "AI-Assisted Exploratory Testing",
    description: "Agent-driven functional testing runs against the story's acceptance criteria through a browser-automation MCP tool. Failures are manually verified, then a second reusable prompt drafts the bug ticket from the confirmed findings.",
    icon: <Search size={20} />,
  },
  {
    title: "Merge",
    description: "Verified changes land in main, keeping automated suites in sync with the application.",
    icon: <GitMerge size={20} />,
  },
];

export const AIWorkflow = () => {
  return (
    <div className="w-full">
      <div className="glass-panel rounded-3xl p-6 md:p-10 mb-10">
        <p className="text-lg text-text-secondary leading-relaxed max-w-3xl">
          Earlier this year I joined a pilot at J.D. Power reimagining the SDLC around AI agents — a small cross-functional pod (product owner, designer, QA, two developers, one PM) rebuilding how a feature goes from story to production. Here's the workflow we landed on.
        </p>
      </div>

      <div className="relative border-l border-white/10 ml-4 md:ml-0 space-y-10">
        {STAGES.map((stage, idx) => (
          <motion.div
            key={stage.title}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            className="relative pl-8 md:pl-12"
          >
            <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-black" />
            <div className="glass-panel rounded-2xl p-6 flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                {stage.icon}
              </div>
              <div>
                <div className="text-xs font-mono text-text-secondary mb-1">STEP {idx + 1}</div>
                <h4 className="text-lg font-semibold text-white mb-2">{stage.title}</h4>
                <p className="text-text-secondary leading-relaxed">{stage.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
