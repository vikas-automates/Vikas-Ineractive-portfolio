import React, { useState, useRef, useEffect } from 'react';

export const Terminal = () => {
  const [history, setHistory] = useState<string[]>(['Welcome to VK-OS v2.4. Type "help" for commands.']);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  const commands: Record<string, string> = {
    help: 'Available commands: about, contact, skills, clear, sudo',
    about: 'Vikas Kumar | Senior QA Automation Analyst | Passionate about breaking code so you dont have to.',
    contact: 'Email: vkvikaskumar447@gmail.com | Phone: +1 226-978-9697',
    skills: 'Expertise: Playwright, Selenium, AWS, Docker, TypeScript, Java.',
    sudo: 'Permission denied: You are not an admin.',
    clear: 'CLEAR_ACTION',
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    
    if (cmd === 'clear') {
      setHistory([]);
    } else if (commands[cmd]) {
      setHistory(prev => [...prev, `> ${input}`, commands[cmd]]);
    } else if (cmd !== '') {
      setHistory(prev => [...prev, `> ${input}`, `Command not found: ${cmd}`]);
    }
    
    setInput('');
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  return (
    <div className="retro-border h-64 flex flex-col p-4 bg-black font-mono text-sm overflow-hidden">
        <div className="text-xs text-green-700 border-b border-green-900 pb-1 mb-2 flex justify-between">
            <span>TERMINAL_ACCESS</span>
            <span>bash</span>
        </div>
      <div className="flex-1 overflow-y-auto space-y-1 scrollbar-hide">
        {history.map((line, i) => (
          <div key={i} className="break-words">{line}</div>
        ))}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={handleCommand} className="mt-2 flex gap-2">
        <span className="text-green-500">{`$`}</span>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-transparent border-none outline-none text-green-500 flex-1 caret-green-500"
          autoFocus
          placeholder="Type command..."
        />
      </form>
    </div>
  );
};