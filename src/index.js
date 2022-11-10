import React from 'react';
import { createRoot } from 'react-dom/client';
import '@atlaskit/css-reset'
import App from './App';
import { initialData } from './initial-data';

const root = createRoot(document.getElementById('root'));
root.render(<App data={initialData} />);
