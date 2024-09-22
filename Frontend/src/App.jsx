import React, { useState } from 'react';  // Asegúrate de importar useState
import { useNavigate } from 'react-router-dom';  // Importar useNavigate
import Producto from './Producto';  
import Proveedor from './Proveedor';  
import Clientes from './Clientes';  
import Empleados from './Empleados';
import './App.css';  
import RegistrarCompra from './RegistrarCompra';
import Compra from './Compra';
import Reporte from './Reporte';


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
      case 'Productos':
        return <Producto />;
      case 'Proveedores':
        return <Proveedor />;
      case 'Clientes':
        return <Clientes />;
      case 'Empleados':
        return <Empleados />;
      case 'RegistrarCompra':
        return <RegistrarCompra />;
      case 'Compra':
        return <Compra />;
      case 'Reporte':
        return <Reporte />
      default:
        return <div>Selecciona una opción del menú</div>;
    }
  };

  return (
    <div className={`App ${isDarkMode ? 'dark-mode' : ''}`}> {/* Añadimos clase para modo oscuro */}
      <div className="content">
        <div className="sidebar">
          <ul>
            <li><button onClick={() => setSelectedMenu('Productos')}>Productos</button></li>
            <li><button onClick={() => setSelectedMenu('Proveedores')}>Proveedores</button></li>
            <li><button onClick={() => setSelectedMenu('Clientes')}>Clientes</button></li>
            <li><button onClick={() => setSelectedMenu('Empleados')}>Empleados</button></li>
            <li><button onClick={() => setSelectedMenu('RegistrarCompra')}>RegistrarCompra</button></li>
            <li><button onClick={() => setSelectedMenu('Compra')}>Compra</button></li>
            <li><button onClick={() => setSelectedMenu('Reporte')}>Reporte</button></li>
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
