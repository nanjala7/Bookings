import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    console.log('buttonText:', buttonText);
    console.log('selectedStaff:', selectedStaff);
    console.log('selectedHaircuts:', selectedHaircuts);
    console.log('selectedFacialTreatments:', selectedFacialTreatments);
    console.log('selectedColors:', selectedColors);
    console.log('selectedTreatments:', selectedTreatments);
    console.log('selectedDate:', selectedDate);
    console.log('selectedTimeSlot:', selectedTimeSlot);
  }, [buttonText, selectedStaff, selectedHaircuts, selectedFacialTreatments, selectedColors, selectedTreatments, selectedDate, selectedTimeSlot]);

  // Debounce function to limit API calls
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
        queryParam = `email=${contact}`;
      } else if (mobilePattern.test(contact)) {
        queryParam = `mobile=${contact}`;
      } else {
        setErrorMessage('Please enter a valid email or mobile number.');
        return;
      }

      const response = await fetch(`http://127.0.0.1:8000/customers/lookup?${queryParam}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data); // Debugging: Log the API response

      // Adjusted logic: Check if the response contains customer details
      if (data.results && data.results.length > 0) {
        const customerId = data.results[0].id; // Assuming the response contains an array of customers
        console.log('Customer ID:', customerId); // Log the customer ID to the console
        setCustomerId(customerId); // Store the customer ID
        setIsCustomerInDatabase(true);
        setErrorMessage('');
      } else {
        setIsCustomerInDatabase(false);
        setErrorMessage('Customer not found. Please fill out the form below.');
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

     // Combine date and time into a JavaScript Date object
  let dateTime = new Date(selectedDate.setHours(
    parseInt(selectedTimeSlot.split(':')[0], 10) + (selectedTimeSlot.includes('PM') && !selectedTimeSlot.includes('12') ? 12 : 0),
    parseInt(selectedTimeSlot.split(':')[1].split(' ')[0], 10)
  ));

    // Convert to ISO string and ensure it includes milliseconds and timezone information
  // Assuming the server expects the time in UTC, convert the dateTime to UTC
  let dateTimeISO = dateTime.toISOString(); // This already include

    const appointmentData = {
      customer_id: customerId,
      user_id: selectedStaff.id, // Use the selected staff ID
      service_ids: [
        ...selectedHaircuts.map(service => service.value),
        ...selectedFacialTreatments.map(service => service.value),
        ...selectedColors.map(service => service.value),
        ...selectedTreatments.map(service => service.value),
      ],
      location_id: 1, // Replace with the actual location ID
      date_time:dateTimeISO, // Combine date and time
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
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Appointment created:', data);
      // Handle success (e.g., show a success message, redirect, etc.)
    } catch (error) {
      console.error('Error creating appointment:', error);
      // Handle error (e.g., show an error message)
    }
  };

  // Debounced version of handleCheckCustomer
  const debouncedCheckCustomer = debounce(handleCheckCustomer, 500);

  useEffect(() => {
    if (contact !== '') {
      debouncedCheckCustomer();
    } else {
      setIsCustomerInDatabase(null); // Reset state when input is cleared
      setErrorMessage(''); // Clear error message when input is cleared
    }
  }, [contact]);

  return (
    <Sheet>
      <SheetTrigger>
        <Button className="bg-yellow-400 text-black hover:bg-yellow-400">
          {buttonText}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-xl">Enter your Details</SheetTitle>
          <SheetDescription>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="contact"
                  style={{
                    fontSize: '16px',
                    marginRight: '8px',
                    textAlign: 'left',
                  }}
                >Email or Mobile Number</Label>
                <Input
                  id="contact"
                  type="text"
                  placeholder="Email or Mobile Number"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  required
                />
              </div>
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
              {isCustomerInDatabase === false && <CustomerForm />}
              {(isCustomerInDatabase || isCustomerInDatabase === null) && (
                <Button
                  type="submit"
                  className="w-full bg-yellow-400 text-black hover:bg-yellow-400"
                  onClick={handleBookNow}
                >
                  Book Now
                </Button>
              )}
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default CustomerDetails;