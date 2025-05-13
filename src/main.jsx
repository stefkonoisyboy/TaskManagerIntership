import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter as Router} from 'react-router-dom';
import{QueryClient, QueryClientProvider} from "@tanstack/react-query";

const client= new QueryClient();


createRoot(document.getElementById('root')).render(
  <StrictMode>
     <QueryClientProvider client={client}>
    <Router>
    <App />
    </Router>
    </QueryClientProvider>
  </StrictMode>,
)
