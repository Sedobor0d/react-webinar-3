import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './reset.css';

import App from './app.js';

const root = createRoot(document.getElementById('root'));

// Первый рендер приложения
root.render(<App />);
