import React from 'react';

export const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-black py-12 px-6 mt-24">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-text-secondary text-sm">
        <div className="mb-4 md:mb-0">
          <p>© {new Date().getFullYear()} Vikas Kumar. All rights reserved.</p>
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-white transition-colors">GitHub</a>
          <a href="mailto:vkvikaskumar447@gmail.com" className="hover:text-white transition-colors">Email</a>
        </div>
      </div>
    </footer>
  );
};