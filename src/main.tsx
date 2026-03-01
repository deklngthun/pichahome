import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { LanguageProvider } from './LanguageContext.tsx';
import { BookingProvider } from './BookingContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <BookingProvider>
        <App />
      </BookingProvider>
    </LanguageProvider>
  </StrictMode>,
);
