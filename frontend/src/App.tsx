import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import RestaurantPanel from './pages/RestaurantPanel';
import Sidebar from './components/Sidebar';
import { LogProvider } from './context/LogContext';
import './index.css';

function App() {
  return (
    <LogProvider>
      <BrowserRouter>
        <div className="flex min-h-screen bg-gray-50">
          <Sidebar />

          {/* Main Content Area */}
          <div className="flex-1 ml-64">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/restaurant" element={<RestaurantPanel />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </LogProvider>
  );
}

export default App;
