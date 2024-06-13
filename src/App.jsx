import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './home/home';
import Booking from './booking/booking';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
      </Routes>
    </Router>
  );
}

export default App;