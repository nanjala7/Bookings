

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './home/home';
import Booking from './booking/booking';
import Selecting from './selecting/selecting'; // Import the Selecting component
import Emails from './emails/index';
import Staff from './booking/staff';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/emails" element={<Emails />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/selecting" element={<Selecting />} /> {/* Add a new Route for the Selecting page */}
      </Routes>
    
    </Router>
    
  );
}

export default App;