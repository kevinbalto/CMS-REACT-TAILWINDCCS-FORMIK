import { useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from './layout/layout';
import EditarCliente from './pages/editarCliente';
import Inicio from './pages/inicio';
import NuevoCliente from './pages/nuevoCliente';
import VerCliente from './pages/verCliente';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/clientes" element={<Layout />}>
          <Route index element={<Inicio />} />
          <Route path="nuevo" element={<NuevoCliente />} />
          <Route path="editar/:id" element={<EditarCliente />} />
          <Route path=":id" element={<VerCliente />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
