import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './home/home';
import Booking from './booking/booking';
import Staff from './booking/staff';
import BookingAppointment from './booking/bookappointment';
import CustomerForm from './booking/customerform';
import { gapi } from 'gapi-script';
import { useEffect } from 'react';

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
        <Route path="/booking/:network_slug/locations" element={<Home />} />
        <Route path="/booking/:network_slug/locations/:location_id/services/" element={<Booking />} />
        <Route path="/booking/:network_slug/locations/:location_id/staff" element={<Staff />} />
        <Route path="/booking/:network_slug/locations/:location_id/customers" element={<CustomerForm />} />
        <Route path="/booking/:network_slug/locations/:location_id/appointments" element={<BookingAppointment />} />

      </Routes>
    </Router>
  );
}

export default App;
