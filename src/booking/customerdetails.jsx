import React, { useState } from 'react';
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
  date,
  selectedTimeSlot,
  total,
}) {
  const [contact, setContact] = useState('');
  const [isCustomerInDatabase, setIsCustomerInDatabase] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const handleCheckCustomer = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/customers?contact=${contact}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      // Assuming your API returns a JSON response indicating customer existence
      if (data.exists) {
        setIsCustomerInDatabase(true); // Customer found
        setErrorMessage('');
      } else {
        setIsCustomerInDatabase(false); // Customer not found
        setErrorMessage('Customer not found. Please fill out the form below.');
      }
    } catch (error) {
      console.error('Error checking customer:', error);
      setIsCustomerInDatabase(false); // Customer not found (or error)
      setErrorMessage('Error checking customer. Please try again later.');
    }
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
              {!isCustomerInDatabase ? (
                <>
                  <p className="text-red-500">{errorMessage}</p>
                  <CustomerForm />
                </>
              ) : (
                <Button
                  type="submit"
                  className="w-full bg-yellow-400 text-black hover:bg-yellow-400"
                  onClick={handleCheckCustomer}
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
