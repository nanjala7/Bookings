import React, { useState } from 'react';
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
      customerId = customer.id; // Save the customer ID for potential rollback
      console.log('Customer created:', customer);
      onCustomerCreated(customer.id);

    } catch (error) {
      console.error('Customer creation error:', error.message);
      // Handle customer creation error (e.g., show error message)
      return; // Stop execution if customer creation fails
    }

    // Combine date and time into a JavaScript Date object
let dateTime = new Date(selectedDate);
dateTime.setHours(
  parseInt(selectedTimeSlot.split(':')[0], 10) + (selectedTimeSlot.includes('PM') && !selectedTimeSlot.includes('12') ? 12 : 0),
  parseInt(selectedTimeSlot.split(':')[1].split(' ')[0], 10),
  0 // Assuming seconds are not part of the selectedTimeSlot, set to 0
);

// Convert to ISO string and ensure it includes milliseconds and timezone information
// Assuming the server expects the time in UTC, convert the dateTime to UTC
let dateTimeISO = dateTime.toISOString(); // This already includes milliseconds and timezone information


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
    location_id: locationId, // Use the location ID
    date_time: dateTimeISO, // Use the correctly formatted dateTimeISO here
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
      // Handle success (e.g., show success message, clear form, etc.)
      setFirstName('');
      setLastName('');
      setEmail('');
      setMobile('');

    } catch (error) {
      console.error('Appointment creation error:', error.message);
      // Handle appointment creation error (e.g., show error message)
      // Consider rollback or cleanup actions here if necessary
    }
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
              </div>
            </form>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default CustomerForm;