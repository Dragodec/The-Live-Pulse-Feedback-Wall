import React from 'react';
import { motion } from 'framer-motion';

export default function VibeCard({ vibe }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="bg-white/5 border border-white/10 p-5 rounded-3xl backdrop-blur-sm flex items-center gap-4 hover:border-white/20 hover:bg-white/[0.07] transition-all group"
    >
      <div className="text-3xl md:text-4xl select-none flex-shrink-0 group-hover:scale-110 transition-transform">
        {vibe.emoji}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-white/90 font-medium text-sm md:text-base leading-snug break-words">
          {vibe.message}
        </p>
        <div className="mt-2 flex items-center gap-2 opacity-30 text-[9px] font-bold tracking-widest uppercase">
          <span>{new Date(vibe.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          <span className="h-1 w-1 rounded-full bg-white/50" />
          <span className="truncate">LIVE_PULSE</span>
        </div>
      </div>
    </motion.div>
  );
}