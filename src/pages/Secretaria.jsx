import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Secretaria() {
  const [turnos, setTurnos] = useState([]);
  const [turnoSeleccionado, setTurnoSeleccionado] = useState(null);
  const [showModal, setShowModal] = useState(false);
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

  const rellamarTurno = (turno) => {
    llamarTurno(turno);
    hablarTurno(turno.turno);
    setShowModal(false);
  };

  const hablarTurno = (turno) => {
    if ('speechSynthesis' in window) {
      const mensaje = new SpeechSynthesisUtterance(`${turno}, Diríjase al box 1.`);
      mensaje.lang = 'es-ES';
      mensaje.rate = 1;
      mensaje.pitch = 1;
      speechSynthesis.speak(mensaje);
    } else {
      console.warn('Tu navegador no soporta síntesis de voz.');
    }
  };

  const marcarTurnoListo = async (turno) => {
    try {
      await fetch(`http://localhost:5000/turnos/${turno.id}`, {
        method: 'DELETE',
      });

      // Eliminar el turno de la lista localmente
      setTurnos((prevTurnos) => prevTurnos.filter((t) => t.id !== turno.id));

      setShowModal(false);
    } catch (error) {
      console.error('Error al eliminar turno:', error);
      setError('Error al marcar el turno como listo');
    }
  };

  return (
    <div className="container">
      <h2>Secretaría</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <ul className="list-group">
        {turnos.map((turno) => (
          <li key={turno.id} className="list-group-item d-flex justify-content-between">
            {turno.turno} - {turno.especialidad}
            <button className="btn btn-primary" onClick={() => { setTurnoSeleccionado(turno); setShowModal(true); }}>
              Llamar
            </button>
          </li>
        ))}
      </ul>

      {/* Ventana emergente con las opciones */}
      {showModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Opciones para el turno {turnoSeleccionado.turno}</h5>
                <button type="button" className="close" onClick={() => setShowModal(false)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Seleccione una opción:</p>
                <button className="btn btn-secondary w-100 mb-2" onClick={() => llamarTurno(turnoSeleccionado)}>
                  Llamar turno
                </button>
                <button className="btn btn-warning w-100 mb-2" onClick={() => rellamarTurno(turnoSeleccionado)}>
                  Rellamar turno
                </button>
                <button className="btn btn-success w-100 mb-2" onClick={() => marcarTurnoListo(turnoSeleccionado)}>
                  Listo
                </button>
                <button className="btn btn-info w-100">
                  Atrasar turno
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
