import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import RestaurantPanel from './pages/RestaurantPanel';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/restaurant" element={<RestaurantPanel />} />
      </Routes>

      {/* Navigation Helper */}
      <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-3 text-sm">
        <p className="text-gray-600 mb-2 font-medium">Navegación:</p>
        <div className="flex gap-2">
          <Link to="/" className="text-ucab-primary hover:underline">Vista Estudiante</Link>
          <span className="text-gray-400">|</span>
          <Link to="/restaurant" className="text-ucab-primary hover:underline">Vista Restaurante</Link>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
