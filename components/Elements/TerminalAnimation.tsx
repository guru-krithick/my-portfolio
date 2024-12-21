"use client";

import { Copy } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

interface TerminalAnimationProps {
  command?: string;
  title?: string;
}

export function TerminalAnimation({ 
  command = "Welcome to my portfolio!",
  title = "Terminal"
}: TerminalAnimationProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full max-w-[500px] p-4 overflow-hidden border border-neutral-300 rounded-xl bg-neutral-100/20 backdrop-blur-md"
    >
      <div className="relative z-10 flex flex-col gap-4 overflow-hidden border border-neutral-600 rounded-lg">
        <div className="flex items-center justify-between min-h-[40px] px-3 bg-[#202425] rounded-t-lg">
          <div className="flex items-center h-10 gap-2 overflow-hidden select-none">
            <svg
              className="w-[18px] h-[18px] mt-0.5 text-blue-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
            >
              <path d="M7 15L10 12L7 9M13 15H17M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z" />
            </svg>
            <span className="font-semibold text-neutral-400 truncate">{title}</span>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center justify-center p-1 ml-auto border rounded-md border-neutral-400 bg-[#202425] text-neutral-400 hover:bg-neutral-800 transition-colors"
          >
            <Copy className="w-5 h-5" />
          </button>
        </div>
        <div className="flex flex-col relative rounded-b-lg overflow-x-auto p-4 leading-[19px] text-white bg-black font-mono">
          <div className="flex flex-row items-center flex-nowrap whitespace-pre text-base">
            <code className="text-neutral-600">-&nbsp;</code>
            <code className="text-pink-500">Hello!&nbsp;</code>
            <code className="relative flex items-center flex-row animate-typing">
              <span className="relative block whitespace-nowrap overflow-hidden">
                {command}
              </span>
              <span className="relative block h-full border-r-[0.15em] border-pink-500 animate-blink" />
            </code>
          </div>
        </div>
      </div>
    </motion.div>
  );
}