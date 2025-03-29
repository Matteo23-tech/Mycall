import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';



export default function WelcomePage() {
  const navigate = useNavigate();  // hook para redirigir a las otras páginas

  const goToSection = (section) => {
    navigate(`/${section}`);
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="card-title text-center mb-4">Bienvenido al Sistema</h2>
        <p className="card-text text-center mb-4">Seleccione una sección para ingresar:</p>
        <Button text="Tótem" onClick={() => goToSection('totem')} color="primary" />
        <Button text="Llamador" onClick={() => goToSection('llamador')} color="info" />
        <Button text="Secretaría" onClick={() => goToSection('secretaria')} color="warning" />
        <Button text="Doctor" onClick={() => goToSection('doctor')} color="success" />
      </div>
    </div>
  );
}
