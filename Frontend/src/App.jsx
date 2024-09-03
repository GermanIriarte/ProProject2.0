import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Producto from './Producto';  // Importa el componente de productos
import Proveedor from './Proveedor';  // Importa el componente de proveedores
import Clientes from './Clientes';  // Importa el componente de clientes
import Empleados from './Empleados';  // Importa el componente de empleados

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('');
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(''); 

  const navigate = useNavigate();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, rol }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(`Login successful! Welcome ${rol === 'admin' ? 'Administrator' : 'Employee'}.`);
        setIsLoggedIn(true);
      } else {
        setMessage(data.message || 'Invalid credentials or role.');
      }
    } catch (error) {
      setMessage('Server error');
    }
  };

  const handleSkipLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setRol('');
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case 'productos':
        return <Producto />;  // Renderiza el componente de productos
      case 'proveedores':
        return <Proveedor />;  // Renderiza el componente de proveedores
      case 'clientes':
        return <Clientes />;  // Renderiza el componente de clientes
      case 'empleados':
        return <Empleados />;  // Renderiza el componente de empleados
      default:
        return <div>Selecciona una opción del menú</div>;
    }
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <div className="login-container">
          <h2>Login</h2>
          <form onSubmit={handleLoginSubmit}>
            <div>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="rol">Rol:</label>
              <select
                id="rol"
                value={rol}
                onChange={(e) => setRol(e.target.value)}
              >
                <option value="">Select Rol</option>
                <option value="admin">Administrador</option>
                <option value="employee">Empleado</option>
                <option value="proveedor">Proveedor</option>
              </select>
            </div>
            <button type="submit">Login</button>
          </form>
          {message && <p>{message}</p>}
          <button onClick={handleSkipLogin} className="skip-button">
            Skip Login
          </button>
        </div>
      ) : (
        <div className="content">
          <div className="sidebar">
            <ul>
              <li><button onClick={() => setSelectedMenu('productos')}>Productos</button></li>
              <li><button onClick={() => setSelectedMenu('proveedores')}>Proveedores</button></li>
              <li><button onClick={() => setSelectedMenu('clientes')}>Clientes</button></li>
              <li><button onClick={() => setSelectedMenu('empleados')}>Empleados</button></li>
            </ul>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
          <div className="historial">
            {renderContent()}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;


