import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Layout
import Layout from './components/layout/Layout';

// Pages
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Medicamentos from './pages/Medicamentos';
import Farmacias from './pages/Farmacias';
import Carrito from './pages/Carrito';
import Pedidos from './pages/Pedidos';
import Perfil from './pages/Perfil';

// Context
import { AuthProvider } from './context/AuthContext';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<Layout><Home /></Layout>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/medicamentos" element={<Layout><Medicamentos /></Layout>} />
              <Route path="/farmacias" element={<Layout><Farmacias /></Layout>} />
              <Route path="/carrito" element={<Layout><Carrito /></Layout>} />
              <Route path="/pedidos" element={<Layout><Pedidos /></Layout>} />
              <Route path="/perfil" element={<Layout><Perfil /></Layout>} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;