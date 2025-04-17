import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router';
import { UsersProvider } from './contexts/UsersContext.tsx';
import { BooksProvider } from './contexts/BooksContext.tsx';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <BrowserRouter>
      <UsersProvider>
    <BooksProvider>
        <App />
    </BooksProvider>
      </UsersProvider>
  </BrowserRouter>
);