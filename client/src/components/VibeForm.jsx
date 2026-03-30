import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, SmilePlus } from 'lucide-react';
import { toast } from 'sonner';
import api from '../lib/api';

const EMOJIS = ['🔥', '✨', '🌊', '🎸', '🚀', '🍀', '⚡', '🌈'];

export default function VibeForm() {
  const [message, setMessage] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('✨');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return toast.error("Message can't be empty");

    setIsSubmitting(true);
    try {
      await api.post('/vibe', { message, emoji: selectedEmoji });
      setMessage('');
      toast.success("Vibe dispatched to the pulse.");
    } catch (err) {
      const errorMsg = err.response?.status === 429 
        ? "Slow down! Max 3 vibes per minute." 
        : "Failed to sync vibe.";
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto mb-12">
      <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md shadow-2xl">
        <div className="flex flex-wrap gap-3 mb-6">
          {EMOJIS.map((emo) => (
            <button
              key={emo}
              type="button"
              onClick={() => setSelectedEmoji(emo)}
              className={`text-2xl p-2 rounded-xl transition-all duration-200 ${
                selectedEmoji === emo ? 'bg-white/20 scale-110 ring-2 ring-white/30' : 'hover:bg-white/10'
              }`}
            >
              {emo}
            </button>
          ))}
        </div>
        
        <div className="relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="What's the vibe right now?"
            className="w-full bg-black/20 border border-white/5 rounded-xl p-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all resize-none h-24"
            maxLength={100}
          />
          <button
            disabled={isSubmitting}
            className="absolute bottom-4 right-4 bg-white text-black p-2 rounded-lg hover:scale-105 active:scale-95 transition-transform disabled:opacity-50"
          >
            {isSubmitting ? <SmilePlus className="animate-spin" /> : <Send size={20} />}
          </button>
        </div>
      </form>
    </div>
  );
}