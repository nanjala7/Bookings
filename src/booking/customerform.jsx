// src/components/CustomerForm.js
import React, { useEffect, useState } from 'react';
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

function CustomerForm({ onCustomerCreated, selectedStaff, selectedHaircuts, selectedFacialTreatments, selectedColors, selectedTreatments, selectedDate, selectedTimeSlot }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [locationId, setLocationId] = useState('1');

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: '962343269753-9aehum1a239f5nft3s56o3j8gjj6gt7j.apps.googleusercontent.com',
      callback: handleGoogleSignUp,
    });

    google.accounts.id.renderButton(
      document.getElementById('googleSignUpButton'),
      { theme: 'outline', size: 'large' }  // customization attributes
    );
  }, []);

  const handleGoogleSignUp = async (response) => {
    const userObject = jwt_decode(response.credential);
    setFirstName(userObject.given_name);
    setLastName(userObject.family_name);
    setEmail(userObject.email);
    setMobile(userObject.mobile || ''); // Optional field
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let customerId = null;

    try {
      // Customer creation
      const customerData = {
        first_name: firstName.trim().toUpperCase(),
        last_name: lastName.trim().toUpperCase(),
        email: email.trim().toLowerCase(),
        mobile: mobile.trim(),
        location: locationId,
      };

      const customerResponse = await fetch('http://127.0.0.1:8000/customers/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData),
      });

      if (!customerResponse.ok) {
        throw new Error(`Failed to create customer (Status: ${customerResponse.status})`);
      }

      const customer = await customerResponse.json();
      customerId = customer.id;
      console.log('Customer created:', customer);
      onCustomerCreated(customer.id);

    } catch (error) {
      console.error('Customer creation error:', error.message);
      return;
    }

    let dateTime = new Date(selectedDate);
    dateTime.setHours(
      parseInt(selectedTimeSlot.split(':')[0], 10) + (selectedTimeSlot.includes('PM') && !selectedTimeSlot.includes('12') ? 12 : 0),
      parseInt(selectedTimeSlot.split(':')[1].split(' ')[0], 10),
      0
    );

    let dateTimeISO = dateTime.toISOString();

    try {
      // Appointment creation
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

      const appointmentResponse = await fetch('http://127.0.0.1:8000/appointments/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });

      if (!appointmentResponse.ok) {
        throw new Error(`Failed to create appointment (Status: ${appointmentResponse.status})`);
      }

      const appointment = await appointmentResponse.json();
      console.log('Appointment created:', appointment);

      alert('Appointment successfully created');
      window.location.reload();
      setFirstName('');
      setLastName('');
      setEmail('');
      setMobile('');

    } catch (error) {
      console.error('Appointment creation error:', error.message);
    }
  };

  return (
    <Sheet>
      <SheetTrigger>
        <Button className="bg-yellow-400 text-black hover:bg-yellow-400 w-40">
          Proceed to book
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add your details</SheetTitle>
          <SheetDescription>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="first-name">First name</Label>
                    <Input
                      id="first-name"
                      placeholder="Max"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="last-name">Last name</Label>
                    <Input
                      id="last-name"
                      placeholder="Robinson"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="MobileNo.">Mobile Number</Label>
                  <Input
                    id="MobileNo."
                    type="tel"
                    placeholder="+254 700000000"
                    required
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Book Now
                </Button>
                <div id="googleSignUpButton" className="mt-4"></div>
              </div>
            </form>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default CustomerForm;
