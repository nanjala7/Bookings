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
  const [isCustomerInDatabase, setIsCustomerInDatabase] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCheckCustomer = () => {
    // Logic to check if customer is in the database
    // This should set isCustomerInDatabase to false if the customer is not found
    // For demonstration, we'll assume the customer is not found
    setIsCustomerInDatabase(false);
    setErrorMessage('Customer not found. Please fill out the form below.');
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
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="MobileNo.">Mobile Number</Label>
                <Input id="MobileNo." type="tel" placeholder="+254 700000000" required />
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
