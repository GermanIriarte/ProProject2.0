import React, { useState } from 'react';  // Asegúrate de importar useState
import { useNavigate } from 'react-router-dom';  // Importar useNavigate
import Producto from './Producto';  
import Proveedor from './Proveedor';  
import Clientes from './Clientes';  
import Empleados from './Empleados';
import './App.css';  
import RegistrarCompra from './RegistrarCompra';

function App() {
  const [selectedMenu, setSelectedMenu] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);  // Estado para el modo oscuro
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);  // Alternar entre claro y oscuro
  };

  const handleLogout = () => {
    navigate('/', { replace: true });
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case 'productos':
        return <Producto />;
      case 'proveedores':
        return <Proveedor />;
      case 'clientes':
        return <Clientes />;
      case 'empleados':
        return <Empleados />;
      case 'RegistrarCompra':
        return <RegistrarCompra />;
      case 'Compra':
        return <RegistrarCompra />;
      default:
        return <div>Selecciona una opción del menú</div>;
    }
  };

  return (
    <div className={`App ${isDarkMode ? 'dark-mode' : ''}`}> {/* Añadimos clase para modo oscuro */}
      <div className="content">
        <div className="sidebar">
          <ul>
            <li><button onClick={() => setSelectedMenu('productos')}>Productos</button></li>
            <li><button onClick={() => setSelectedMenu('proveedores')}>Proveedores</button></li>
            <li><button onClick={() => setSelectedMenu('clientes')}>Clientes</button></li>
            <li><button onClick={() => setSelectedMenu('empleados')}>Empleados</button></li>
            <li><button onClick={() => setSelectedMenu('RegistrarCompra')}>RegistrarCompra</button></li>
            <li><button onClick={() => setSelectedMenu('Compra')}>Compra</button></li>
          </ul>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
        <div className="historial">
          {renderContent()}
        </div>
      </div>

      {/* Botón para cambiar el tema */}
      <button className="toggle-dark-mode" onClick={toggleDarkMode}>
        {isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}
      </button>
    </div>
  );
}

export default App;
