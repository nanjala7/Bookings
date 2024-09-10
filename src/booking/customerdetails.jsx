// src/components/CustomerDetails.jsx

import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import CustomerForm from './customerform';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {jwtDecode} from 'jwt-decode'; // Fix import

function CustomerDetails({
  buttonText,
  selectedStaff,
  selectedHaircuts,
  selectedFacialTreatments,
  selectedColors,
  selectedTreatments,
  selectedDate,
  selectedTimeSlot,
}) {
  const [contact, setContact] = useState('');
  const [isCustomerInDatabase, setIsCustomerInDatabase] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [customerId, setCustomerId] = useState(null);
  const [googleUserData, setGoogleUserData] = useState({});

  const handleGoogleSignUp = (credentialResponse) => {
    const userObject = jwtDecode(credentialResponse.credential);
    setGoogleUserData({
      firstName: userObject.given_name || '',
      lastName: userObject.family_name || '',
      email: userObject.email || '',
    });
    setContact(userObject.email || '');
  };

  useEffect(() => {
    console.log('buttonText:', buttonText);
    console.log('selectedStaff:', selectedStaff);
    console.log('selectedHaircuts:', selectedHaircuts);
    console.log('selectedFacialTreatments:', selectedFacialTreatments);
    console.log('selectedColors:', selectedColors);
    console.log('selectedTreatments:', selectedTreatments);
    console.log('selectedDate:', selectedDate);
    console.log('selectedTimeSlot:', selectedTimeSlot);
  }, [
    buttonText, 
    selectedStaff, 
    selectedHaircuts, 
    selectedFacialTreatments, 
    selectedColors, 
    selectedTreatments, 
    selectedDate, 
    selectedTimeSlot
  ]);

  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  const handleCheckCustomer = async () => {
    try {
      const emailPattern = /\S+@\S+\.\S+/;
      const mobilePattern = /^[0-9]{12}$/;
      let queryParam = '';

      if (emailPattern.test(contact)) {
        queryParam = `email=${contact}`; // Fix query string interpolation
      } else if (mobilePattern.test(contact)) {
        queryParam = `mobile=${contact}`; // Fix query string interpolation
      } else {
        setErrorMessage('Please enter a valid email or mobile number.');
        return;
      }

      const response = await fetch(`http://127.0.0.1:8000/customers/lookup?${queryParam}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`); // Fix error message template literal
      }
      const data = await response.json();
      console.log(data);
      sessionStorage.setItem('access_token', data.access); // Store the access token

      if (data.results && data.results.length > 0) {
        const customerId = data.results[0].id;
        console.log('Customer ID:', customerId);
        setCustomerId(customerId);
        setIsCustomerInDatabase(true);
        setErrorMessage('');
      } else {
        setIsCustomerInDatabase(false);
        setErrorMessage('Customer not found. Please Click Register to add customer details.');
      }
    } catch (error) {
      console.error('Error checking customer:', error);
      setIsCustomerInDatabase(false);
      setErrorMessage('Error checking customer. Please try again later.');
    }
  };

  const handleBookNow = async () => {
    if (!customerId) {
      setErrorMessage('Please check customer details first.');
      return;
    }

    let dateTime = new Date(selectedDate); // Avoid mutating selectedDate
    dateTime.setHours(
      parseInt(selectedTimeSlot.split(':')[0], 10) + (selectedTimeSlot.includes('PM') && !selectedTimeSlot.includes('12') ? 12 : 0),
      parseInt(selectedTimeSlot.split(':')[1].split(' ')[0], 10)
    );

    let dateTimeISO = dateTime.toISOString();

    const appointmentData = {
      customer_id: customerId,
      user_id: selectedStaff.id,
      service_ids: [
        ...selectedHaircuts.map(service => service.value),
        ...selectedFacialTreatments.map(service => service.value),
        ...selectedColors.map(service => service.value),
        ...selectedTreatments.map(service => service.value),
      ],
      location_id: 1,
      date_time: dateTimeISO,
      status: 'Scheduled',
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/appointments/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`); // Fix error message template literal
      }

      const data = await response.json();
      console.log('Appointment created:', data);
      // Handle success (e.g., show a success message, redirect, etc.)
    } catch (error) {
      console.error('Error creating appointment:', error);
      // Handle error (e.g., show an error message)
    }
  };

  const debouncedCheckCustomer = debounce(handleCheckCustomer, 500);

  useEffect(() => {
    if (contact !== '') {
      debouncedCheckCustomer();
    } else {
      setIsCustomerInDatabase(null);
      setErrorMessage('');
    }
  }, [contact]);

  const handleCustomerCreated = async (newCustomerId) => {
    setCustomerId(newCustomerId);
    setContact(contact); // Automatically fill contact with the newly created customer's mobile or email
    setIsCustomerInDatabase(true);
    setErrorMessage('');
    await handleBookNow(); // Automatically book the appointment after customer creation
  };

  return (
    <GoogleOAuthProvider clientId="962343269753-9aehum1a239f5nft3s56o3j8gjj6gt7j.apps.googleusercontent.com">
      <Sheet>
        <SheetTrigger>
          <Button className="bg-yellow-400 text-black hover:bg-yellow-400">
            {buttonText}
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-xl">Enter Your Details</SheetTitle>
            <SheetDescription>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="contact"
                    style={{
                      fontSize: '16px',
                      marginRight: '8px',
                      textAlign: 'left',
                    }}
                  >Email </Label>
                  <Input
                    id="contact"
                    type="text"
                    placeholder="john@example.com "
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    required
                  />
                </div>  
                <div className="text-center my-0.5">or</div>

                <div id="googleSignUpButton" className="mt-2">
                  <GoogleLogin
                    onSuccess={handleGoogleSignUp}
                    onError={() => console.log('Login Failed')}
                    useOneTap
                    className="google-login-button"
                  />
                </div>
                {!isCustomerInDatabase && (
                  <p className="text-blue-500 text-sm mt-2">
                     Are you a new customer? Click the "Register" button below.
                  </p>
                )}
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                <div className="flex justify-between items-center">
                  {!isCustomerInDatabase && (
                    <CustomerForm
                      onCustomerCreated={handleCustomerCreated}
                      selectedStaff={selectedStaff}
                      selectedHaircuts={selectedHaircuts}
                      selectedFacialTreatments={selectedFacialTreatments}
                      selectedColors={selectedColors}
                      selectedTreatments={selectedTreatments}
                      selectedDate={selectedDate}
                      selectedTimeSlot={selectedTimeSlot}
                      googleUserData={googleUserData}  // Pass Google data here
                    />
                  )}
                  <Button
                    type="submit"
                    className="w-full bg-yellow-400 text-black hover:bg-yellow-400"
                    onClick={handleBookNow}
                    style={{ maxWidth: '200px', marginLeft: !isCustomerInDatabase ? '20px' : '0' }}
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </GoogleOAuthProvider>
  );
}

export default CustomerDetails;
