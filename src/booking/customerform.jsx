import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { jwtDecode } from 'jwt-decode'; // Use named import for jwt-decode
import './customerform.css'; // Import the CSS file

function CustomerForm({ onCustomerCreated, selectedStaff, selectedHaircuts, selectedFacialTreatments, selectedColors, selectedTreatments, selectedDate, selectedTimeSlot }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [locationId, setLocationId] = useState('1');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGoogleSignUp = (credentialResponse) => {
    const userObject = jwtDecode(credentialResponse.credential);
    setFirstName(userObject.given_name || '');
    setLastName(userObject.family_name || '');
    setEmail(userObject.email || '');
    setMobile(userObject.mobile || '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const customerId = await createCustomer();
      await createAppointment(customerId);
      alert('Appointment successfully created');
      window.location.reload();
      resetForm();
    } catch (error) {
      setError(error.message);
      console.error('Error:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const createCustomer = async () => {
    const customerData = {
      first_name: firstName.trim().toUpperCase(),
      last_name: lastName.trim().toUpperCase(),
      email: email.trim().toLowerCase(),
      mobile: mobile.trim(),
      location: locationId,
    };

    const response = await fetch('http://127.0.0.1:8000/customers/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // Replace with your actual token
      },
      body: JSON.stringify(customerData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create customer (Status: ${response.status})`);
    }

    const customer = await response.json();
    onCustomerCreated(customer.id);
    return customer.id;
  };

  const createAppointment = async (customerId) => {
    const dateTime = new Date(selectedDate);
    dateTime.setHours(
      parseInt(selectedTimeSlot.split(':')[0], 10) + (selectedTimeSlot.includes('PM') && !selectedTimeSlot.includes('12') ? 12 : 0),
      parseInt(selectedTimeSlot.split(':')[1].split(' ')[0], 10),
      0
    );
    const dateTimeISO = dateTime.toISOString();

    const appointmentData = {
      customer_id: customerId,
      user_id: selectedStaff.id,
      service_ids: [
        ...selectedHaircuts.map(service => service.value),
        ...selectedFacialTreatments.map(service => service.value),
        ...selectedColors.map(service => service.value),
        ...selectedTreatments.map(service => service.value),
      ],
      location_id: locationId,
      date_time: dateTimeISO,
      status: 'Scheduled',
    };

    const response = await fetch('http://127.0.0.1:8000/appointments/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // Replace with your actual token
      },
      body: JSON.stringify(appointmentData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create appointment (Status: ${response.status})`);
    }

    const appointment = await response.json();
    console.log('Appointment created:', appointment);
  };

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setMobile('');
  };

  return (
    <GoogleOAuthProvider clientId="962343269753-9aehum1a239f5nft3s56o3j8gjj6gt7j.apps.googleusercontent.com">
      <Sheet>
        <SheetTrigger>
          <Button className="bg-yellow-400 text-black hover:bg-yellow-400 w-40">
            Proceed to book Now
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Add your details</SheetTitle>
            <SheetDescription>
              {error && <div className="text-red-500">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="first-name" className="text-left">First name</Label>
                      <Input
                        id="first-name"
                        placeholder="Max"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        disabled={loading}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="last-name" className="text-left">Last name</Label>
                      <Input
                        id="last-name"
                        placeholder="Robinson"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        disabled={loading}
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email" className="text-left">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="MobileNo." className="text-left">Mobile Number </Label>
                    <Input
                      id="MobileNo."
                      type="tel"
                      placeholder="+254 700000000"
                      required
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Booking...' : 'Book Now'}
                  </Button>
                  <div className="text-center my-1">or</div>
                  <div id="googleSignUpButton" className="mt-4">
                    <GoogleLogin
                      onSuccess={handleGoogleSignUp}
                      onError={() => console.log('Login Failed')}
                      useOneTap
                      //ux_mode="popup" // Ensure it uses popup mode
                      className="google-login-button" // Apply the custom CSS class
                    />
                  </div>
                </div>
              </form>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </GoogleOAuthProvider>
  );
}

export default CustomerForm;
