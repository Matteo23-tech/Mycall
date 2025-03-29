import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaPhoneAlt } from 'react-icons/fa';
import './Secretaria.css';
export default function Secretaria() {
  const [turnos, setTurnos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    obtenerTurnos();
    const interval = setInterval(obtenerTurnos, 5000);
    return () => clearInterval(interval);
  }, []);

  const obtenerTurnos = async () => {
    try {
      const response = await fetch('http://localhost:5000/turnos');
      const data = await response.json();
      setTurnos(data);
    } catch (error) {
      console.error('Error al obtener los turnos:', error);
      setError('Error al obtener los turnos');
    }
  };

  const llamarTurno = async (turno) => {
    try {
      await fetch('http://localhost:5000/turno-actual', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(turno),
      });
      obtenerTurnos();
    } catch (error) {
      console.error('Error al llamar turno:', error);
      setError('Error al llamar el turno');
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>UBICACION </h4>
        <div>
          <select className="form-select d-inline-block w-auto me-2">
            <option>BOX 02 </option>
          </select>
          <select className="form-select d-inline-block w-auto">
            <option>(A) Otras Especialidades</option>
            <option>(B) Consulta medica</option>
            <option>(C) Otros</option>
          </select>
        </div>
        <div className="d-flex align-items-center">
          <span className="me-2">Usuario del secre</span>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>Turno</th>
            <th>Tiempo de espera</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {turnos.map((turno) => (
            <tr key={turno.id}>
              <td><strong>{turno.turno}</strong> ({turno.especialidad})</td>
              <td>00:00 min.</td>
              <td>
                <button className="btn btn-success d-flex align-items-center" onClick={() => llamarTurno(turno)}>
                  Llamar <FaPhoneAlt className="ms-2" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
