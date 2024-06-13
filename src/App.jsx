

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './home/home';
import Booking from './booking/booking';
import Selecting from './selecting/selecting'; // Import the Selecting component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/selecting" element={<Selecting />} /> {/* Add a new Route for the Selecting page */}
      </Routes>
    </Router>
  );
}

export default App;