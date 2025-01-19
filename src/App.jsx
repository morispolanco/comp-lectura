import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MaterialLectura from './components/MaterialLectura';
import Navegacion from './components/Navegacion';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navegacion />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<MaterialLectura />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
