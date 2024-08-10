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
  const handleCreateCustomer = async () => {
    const customerData = {
        first_name: firstName, // Ensure this is not empty
        last_name: lastName,   // Optional but ensure it's correct
        mobile: mobile,        // Ensure this is not empty
        email: email,          // Ensure this is not empty and valid
        location: locationId,  // Ensure this corresponds to an existing location
    };

    try {
        const response = await fetch('http://127.0.0.1:8000/customers/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(customerData),
        });

        if (!response.ok) {
            throw new Error(`Failed to create customer (Status: ${response.status})`);
        }

        const data = await response.json();
        console.log('Customer created:', data);
    } catch (error) {
        console.error(error);
    }
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
      console.log(data);

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

    let dateTime = new Date(selectedDate.setHours(
      parseInt(selectedTimeSlot.split(':')[0], 10) + (selectedTimeSlot.includes('PM') && !selectedTimeSlot.includes('12') ? 12 : 0),
      parseInt(selectedTimeSlot.split(':')[1].split(' ')[0], 10)
    ));

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
    setIsCustomerInDatabase(true);
    setErrorMessage('');
    await handleBookNow();
  };

  return (
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
  );
}

export default CustomerDetails;
