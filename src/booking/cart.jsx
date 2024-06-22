import React,{useContext} from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for props validation
import {
  ChevronLeft,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import CustomerDetails from './customerdetails'; // Corrected the import path case sensitivity
import  AppointmentContext  from "@/context/AppointmentContext";

// Define the Cart component
function Cart({ toggleView, selectedStaff, selectedHaircuts, selectedFacialTreatments, selectedColors, selectedTreatments }) {
  const total = calculateTotal(selectedHaircuts, selectedFacialTreatments, selectedColors, selectedTreatments);
  
  const { date, selectedTimeSlot } = useContext(AppointmentContext);

  return (
 // Inside the Cart component's return statement
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '100vh', paddingTop: '10vh' }}>
<Card className="w-[500px] mt-8">
<CardHeader style={{ backgroundColor: '#f5f5f5' }}>
  <CardTitle>APPOINTMENT SUMMARY</CardTitle>
</CardHeader>
    <CardContent>
      <CardDescription>
        <div>
          <h2 style={{ fontSize: '24px' , marginBottom:'10px',marginTop:'10px'}}>Selected Services</h2> {/* Increased text size */}
                  <ul>
          {selectedHaircuts.map((service, index) => (
            <li key={index} style={{ fontSize: '18px',marginBottom:'5px' }}> {/* Increase font size */}
              <strong>{service.name}</strong> - {service.duration} mins - Ksh {service.price}
            </li>
          ))}
          {selectedFacialTreatments.map((service, index) => (
            <li key={index} style={{ fontSize: '18px' ,marginBottom:'5px'}}> {/* Increase font size */}
              <strong>{service.name}</strong> - {service.duration} mins - Ksh {service.price}
            </li>
          ))}
          {selectedColors.map((service, index) => (
            <li key={index} style={{ fontSize: '18px',marginBottom:'5px' }}> {/* Increase font size */}
              <strong>{service.name}</strong> - {service.duration} mins - Ksh{service.price}
            </li>
          ))}
          {selectedTreatments.map((service, index) => (
            <li key={index} style={{ fontSize: '18px',marginBottom:'5px' }}> {/* Increase font size */}
              <strong>{service.name}</strong> - {service.duration} mins - Ksh{service.price}
            </li>
          ))}
        </ul>
        </div>
        <Separator className="my-4" />
        <div> 
          <p style={{ fontSize: '24px' }} >Selected Staff: {selectedStaff.first_name}</p>
          <p style={{ fontSize: '20px' }}>Date: {date.toLocaleDateString()}</p>
          <p style={{ fontSize: '20px' }}>Time Slot: {selectedTimeSlot}</p>
        </div>
        <Separator className="my-4" />
      <div>
        <p style={{ fontSize: '20px' }}>Total: Ksh {new Intl.NumberFormat('en-KE', { style: 'decimal', minimumFractionDigits: 0 }).format(total)}</p>
      </div>
      </CardDescription>
    </CardContent >
<CardFooter className="flex justify-between ">
      <Button variant="ghost" onClick={toggleView}>
        <ChevronLeft className="mr-2 h-4 w-4" /> Go back
      </Button>
      <CustomerDetails
      buttonText={'Proceed to Book Now'}
      selectedStaff={selectedStaff}
      selectedHaircuts={selectedHaircuts}
      selectedFacialTreatments={selectedFacialTreatments}
      selectedColors={selectedColors}
      selectedTreatments={selectedTreatments}
      date={date}
      selectedTimeSlot={selectedTimeSlot}
      total={total}
    />
    </CardFooter>
  </Card>
  </div>
  );
}

// Define PropTypes for Cart component
Cart.propTypes = {
  toggleView: PropTypes.func.isRequired,
  selectedStaff: PropTypes.shape({
    first_name: PropTypes.string.isRequired,
  }).isRequired,
  selectedHaircuts: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
  })).isRequired,
  selectedFacialTreatments: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
  })).isRequired,
  selectedColors: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
  })).isRequired,
  selectedTreatments: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
  })).isRequired,
};

// Helper function to calculate total
function calculateTotal(selectedHaircuts, selectedFacialTreatments, selectedColors, selectedTreatments) {
  let total = 0;
  // Ensure all service arrays are iterated over and their prices are summed up
  [selectedHaircuts, selectedFacialTreatments, selectedColors, selectedTreatments].forEach(services => {
    services.forEach(service => {
      // Convert price to a number to ensure arithmetic operations work correctly
      const price = Number(service.price);
      if (!isNaN(price)) { // Check if price is a valid number
        total += price;
      }
    });
  });
  return total;
}

export default Cart;