import React from 'react';

export default function Button({ text, onClick, color }) {
  return (
    <button onClick={onClick} className={`btn btn-${color} w-100 mb-3`}>
      {text}
    </button>
  );
}