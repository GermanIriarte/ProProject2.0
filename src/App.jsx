import { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('');
  const [message, setMessage] = useState('');

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
      } else {
        setMessage(data.message || 'Invalid credentials or role.');
      }
    } catch (error) {
      setMessage('Server error');
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="login-container">
          <div className="login-form">
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
                </select>
              </div>
              <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
          </div>
        </div>
        <div className="content">
          {/* Aquí puedes agregar el contenido adicional */}
          <h1>SHOPRO</h1>
          <p>BAJO CONSTRUCCION CUIDADO!</p>
        </div>
      </div>
    </div>
  );
}

export default App;
