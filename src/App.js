import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './component/Home';
import Navbar from './component/Navbar';
import { CountryProvider } from './context/CountryContext';

function App() {
  return (
    <div>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<CountryProvider><Home /></CountryProvider>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
