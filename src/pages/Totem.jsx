import React, { useState } from 'react';

export default function Totem() {
  const [turnos, setTurnos] = useState({ A: 0, B: 0, C: 0 }); // Almacena el último número de cada especialidad
  const [turno, setTurno] = useState(null);
  const especialidades = ['A', 'B', 'C'];

  const generarTurno = async (especialidad) => {
    const nuevoNumero = turnos[especialidad] + 1; // Incrementa el último número asignado
    const nuevoTurno = `${especialidad}${nuevoNumero}`;

    setTurnos((prev) => ({ ...prev, [especialidad]: nuevoNumero })); // Guarda el último número en el estado
    setTurno(nuevoTurno);

    await fetch('http://localhost:5000/turnos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ turno: nuevoTurno, especialidad }),
    });
  };

  return (
    <div className="container text-center">
      <h2>Tótem</h2>
      {especialidades.map((esp) => (
        <button key={esp} className="btn btn-primary m-2" onClick={() => generarTurno(esp)}>
          {esp}
        </button>
      ))}
      {turno && <h3>Tu turno: {turno}</h3>}
    </div>
  );
}
