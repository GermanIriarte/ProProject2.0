import React, { useState } from 'react';
import axios from 'axios';
import './Reporte.css'; 

function Reporte() {
  const [selectedDate, setSelectedDate] = useState('');
  const [salesData, setSalesData] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const fetchSalesData = async () => {
    const url = `http://localhost:8081/sales?date=${selectedDate}`;
    console.log('URL de la petición:', url);
    try {
      const response = await axios.get(url);
      console.log("Respuesta del servidor:", response.data);

      setSalesData(response.data.sales);
      setTotalEarnings(response.data.totalEarnings);
    } catch (error) {
      console.error('Error al obtener los datos de ventas:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchSalesData();
  };

  return (
    <div>
      <h1>Reporte de Ventas</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Selecciona una fecha:
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            required
          />
        </label>
        <button type="submit">Generar Reporte</button>
      </form>

      {salesData.length > 0 ? (
        <div>
          <h2>Ventas del día: {selectedDate}</h2>
          <table className="sales-table">
            <thead>
              <tr>
                <th>Código de Producto</th>
                <th>Nombre</th>
                <th>Cantidad Vendida</th>
                <th>Precio</th>
                <th>Ventas Totales</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((item) => (
                <tr key={item.Cod_Producto}>
                  <td>{item.Cod_Producto}</td>
                  <td>{item.Nombre}</td>
                  <td>{item.cantidad_total}</td>
                  <td>{item.Precio}</td>
                  <td>{item.ventas_totales}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3>Ganancias Totales del Día: {totalEarnings}</h3>
        </div>
      ) : (
        <p>No hay ventas para la fecha seleccionada.</p>
      )}
    </div>
  );
}

export default Reporte;
