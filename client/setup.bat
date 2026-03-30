@echo off
title Frontend Scaffold Architect
color 0A

echo [SYSTEM] Scaffolding src/ directory...

:: Create Directory Tree
if not exist "src\lib" mkdir "src\lib"
if not exist "src\components" mkdir "src\components"

:: 1. Create lib/axios.js
echo import axios from 'axios'; > src\lib\axios.js
echo. >> src\lib\axios.js
echo const api = axios.create({ >> src\lib\axios.js
echo   baseURL: import.meta.env.VITE_API_URL ^|^| 'http://localhost:5000/api', >> src\lib\axios.js
echo   headers: { 'Content-Type': 'application/json' }, >> src\lib\axios.js
echo }); >> src\lib\axios.js
echo. >> src\lib\axios.js
echo export default api; >> src\lib\axios.js

:: 2. Create lib/socket.js
echo import { io } from 'socket.io-client'; > src\lib\socket.js
echo. >> src\lib\socket.js
echo const SOCKET_URL = import.meta.env.VITE_SOCKET_URL ^|^| 'http://localhost:5000'; >> src\lib\socket.js
echo. >> src\lib\socket.js
echo export const socket = io(SOCKET_URL, { >> src\lib\socket.js
echo   autoConnect: true, >> src\lib\socket.js
echo   reconnection: true, >> src\lib\socket.js
echo }); >> src\lib\socket.js

:: 3. Create components/VibeForm.jsx (Truncated for Batch compatibility)
echo import React, { useState } from 'react'; > src\components\VibeForm.jsx
echo import { motion } from 'framer-motion'; >> src\components\VibeForm.jsx
echo import { Send } from 'lucide-react'; >> src\components\VibeForm.jsx
echo import { toast } from 'sonner'; >> src\components\VibeForm.jsx
echo import api from '../lib/axios'; >> src\components\VibeForm.jsx

:: 4. Create components/VibeCard.jsx
echo import React from 'react'; > src\components\VibeCard.jsx
echo import { motion } from 'framer-motion'; >> src\components\VibeCard.jsx
echo. >> src\components\VibeCard.jsx
echo export default function VibeCard({ vibe }) { >> src\components\VibeCard.jsx
echo   return ( ^<motion.div layout className="bg-white/5 border border-white/10 p-5 rounded-2xl"^>^<span^>{vibe.emoji}^</span^>^<p^>{vibe.message}^</p^>^</motion.div^> ); >> src\components\VibeCard.jsx
echo } >> src\components\VibeCard.jsx

:: 5. Create components/Feed.jsx
echo import React, { useEffect, useState } from 'react'; > src\components\Feed.jsx
echo import { socket } from '../lib/socket'; >> src\components\Feed.jsx
echo import api from '../lib/axios'; >> src\components\Feed.jsx
echo import VibeCard from './VibeCard'; >> src\components\Feed.jsx

echo [SUCCESS] File structure generated.
echo [NOTE] VibeForm and Feed contain imports; paste the full logic from my previous response.

pause