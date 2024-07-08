import React, { useState, useEffect,  useRef } from 'react';
import CustomerForm from './customerform';
import emailjs from '@emailjs/browser';


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
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

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
  const { toast } = useToast();
  
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

      // Send confirmation email
      await sendConfirmationEmail(contact, data);

      toast({
        title: "Booking Successful",
        description: "Your appointment has been booked successfully. A confirmation email has been sent.",
        status: "success",
      });
    } catch (error) {
      console.error('Error creating appointment:', error);
      setErrorMessage('Error creating appointment. Please try again later.');
    }
  };

  const sendConfirmationEmail = async (contact, appointmentData) => {
    try {
      const emailData = {
        to: contact,
        subject: 'Appointment Confirmation',
        body: `Your appointment is confirmed for ${appointmentData.date_time}. Thank you!`
      };

      const response = await fetch('http://127.0.0.1:8000/send-email/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log('Confirmation email sent');
    } catch (error) {
      console.error('Error sending confirmation email:', error);
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

  return (
    <>
      <Toaster />
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
                   
                    onClick={() => {
                      toast({
                        title: "Booking sucessful!.",
                        description: "booking details sent to email",
                      })
                      handleBookNow();
                      setTimeout(() => {
                        window.location.reload(); // Refresh the window after 2 seconds
                      }, 1500);
                    
                    }}
                 
           >
                    Book Now
                  </Button>
                )}
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default CustomerDetails;
