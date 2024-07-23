import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './home/home';
import Booking from './booking/booking';
import Selecting from './selecting/selecting'; // Import the Selecting component
import Emails from './emails/index';
import Staff from './booking/staff';
import BookingAppointment from './booking/bookappointment';
import { gapi } from 'gapi-script';
import { useEffect } from 'react';
import CustomerForm from './booking/customerform';

const clientId = "962343269753-9aehum1a239f5nft3s56o3j8gjj6gt7j.apps.googleusercontent.com";

function App() {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: ""
      });
    }

    gapi.load('client:auth2', start);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/emails" element={<Emails />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/customerform" element={<CustomerForm />} />
        <Route path="/appointment" element={<BookingAppointment />} />
        <Route path="/selecting" element={<Selecting />} /> {/* Add a new Route for the Selecting page */}
      </Routes>
    </Router>
  );
}

export default App;
