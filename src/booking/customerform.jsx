// src/components/CustomerForm.jsx
import React, { useState, useEffect } from 'react';
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
import './customerform.css';

function CustomerForm({
  onCustomerCreated,
  selectedStaff,
  selectedHaircuts,
  selectedFacialTreatments,
  selectedColors,
  selectedTreatments,
  selectedDate,
  selectedTimeSlot,
  googleUserData = {},
  accessToken,  // Receive the token
}) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [locationId, setLocationId] = useState('1');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [generalError, setGeneralError] = useState('');

  useEffect(() => {
    if (googleUserData.email) setEmail(googleUserData.email);
    if (googleUserData.firstName) setFirstName(googleUserData.firstName);
    if (googleUserData.lastName) setLastName(googleUserData.lastName);
  }, [googleUserData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setEmailError('');
    setMobileError('');
    setGeneralError('');

    try {
      const customerId = await createCustomer();
      await createAppointment(customerId);
      alert('Appointment successfully created');
      window.location.reload();
      resetForm();
    } catch (error) {
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

    try {
      const response = await fetch('http://127.0.0.1:8000/customers/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,  // Use the access token
        },
        body: JSON.stringify(customerData),
      });

      if (!response.ok) {
        const responseData = await response.json();
        if (response.status === 400) {
          if (responseData.detail && typeof responseData.detail === 'string') {
            if (responseData.detail.includes("email")) {
              setEmailError("A customer with this email already exists.");
            } else if (responseData.detail.includes("mobile")) {
              setMobileError("A customer with this mobile number already exists.");
            } else {
              setGeneralError("There was an issue with your submission. Please check the details and try again.");
            }
          } else if (responseData.email) {
            setEmailError(responseData.email[0]);
          } else if (responseData.mobile) {
            setMobileError(responseData.mobile[0]);
          } else {
            setGeneralError("There was an issue with your submission. Please check the details and try again.");
          }
        } else {
          setGeneralError(`Unexpected error occurred: ${response.statusText}`);
        }
        throw new Error(responseData.detail || 'Error occurred');
      }

      const customer = await response.json();
      onCustomerCreated(customer.id);
      return customer.id;
    } catch (error) {
      console.error('Error creating customer:', error);
      if (!emailError && !mobileError && !generalError) {
        setGeneralError("An unexpected error occurred. Please try again later.");
      }
      throw error;
    }
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
        'Authorization': `Bearer ${accessToken}`,  // Use the access token
      },
      body: JSON.stringify(appointmentData),
    });

    if (!response.ok) {
      setGeneralError("Failed to create appointment. Please try again.");
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
    setEmailError('');
    setMobileError('');
    setGeneralError('');
  };

  return (
    <Sheet>
      <SheetTrigger>
        <Button className="bg-yellow-400 text-black hover:bg-yellow-400 w-40">
          Register
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
                  {emailError && <p className="text-red-500">{emailError}</p>}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="MobileNo." className="text-left">Mobile Number</Label>
                  <Input
                    id="MobileNo."
                    type="tel"
                    placeholder="+254 700000000"
                    required
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    disabled={loading}
                  />
                  {mobileError && <p className="text-red-500">{mobileError}</p>}
                </div>
                {generalError && <p className="text-red-500">{generalError}</p>}
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Booking...' : 'Book Now'}
                </Button>
              </div>
            </form>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default CustomerForm;
