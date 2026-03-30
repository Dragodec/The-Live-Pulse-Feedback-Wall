import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { socket } from '../lib/socket';
import api from '../lib/api';
import VibeCard from './VibeCard';

export default function Feed() {
  const [vibes, setVibes] = useState([]);

  useEffect(() => {
    // 1. Sync History: Fetch the last 50 vibes from DB
    const syncHistory = async () => {
      try {
        const { data } = await api.get('/vibe');
        setVibes(data);
      } catch (err) {
        console.error("Pulse sync failed.");
      }
    };

    syncHistory();

    // 2. Real-time Listener: Inject new vibes instantly
    socket.on('new_vibe', (vibe) => {
      setVibes((prev) => {
        // Prevent duplicate keys if user is both sender and receiver
        const exists = prev.find(v => (v._id || v.id) === (vibe._id || vibe.id));
        if (exists) return prev;
        return [vibe, ...prev];
      });
    });

    return () => socket.off('new_vibe');
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-7xl mx-auto px-4 md:px-8 pb-24">
      <AnimatePresence mode="popLayout" initial={false}>
        {vibes.map((vibe) => (
          <VibeCard key={vibe._id || vibe.id} vibe={vibe} />
        ))}
      </AnimatePresence>
    </div>
  );
}