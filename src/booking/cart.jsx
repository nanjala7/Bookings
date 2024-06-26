import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import CustomerDetails from './customerdetails';
import AppointmentContext from "@/context/AppointmentContext";

// Define the Cart component
function Cart({ toggleView, selectedStaff, selectedHaircuts, selectedFacialTreatments, selectedColors, selectedTreatments }) {
  const total = calculateTotal(selectedHaircuts, selectedFacialTreatments, selectedColors, selectedTreatments);
  const { date, selectedTimeSlot } = useContext(AppointmentContext);

  // Define styles with media query support
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      height: '100vh',
      paddingTop: '10vh',
      padding: '0 5%', // Add padding for smaller screens
      '@media (max-width: 600px)': {
        paddingTop: '5vh',
      }
    },
    card: {
      width: '100%',
      maxWidth: '500px',
      marginTop: '2rem',
      '@media (max-width: 600px)': {
        maxWidth: '90%',
      }
    },
    cardHeader: {
      backgroundColor: '#f5f5f5',
    },
    title: {
      fontSize: '24px',
      marginBottom: '10px',
      marginTop: '10px',
      '@media (max-width: 600px)': {
        fontSize: '20px',
      }
    },
    listItem: {
      fontSize: '18px',
      marginBottom: '5px',
      '@media (max-width: 600px)': {
        fontSize: '16px',
      }
    },
    staff: {
      fontSize: '24px',
      marginBottom: '10px',
      '@media (max-width: 600px)': {
        fontSize: '20px',
      }
    },
    dateTime: {
      fontSize: '20px',
      marginBottom: '10px',
      '@media (max-width: 600px)': {
        fontSize: '18px',
      }
    },
    total: {
      fontSize: '20px',
      '@media (max-width: 600px)': {
        fontSize: '18px',
      }
    },
    footer: {
      display: 'flex',
      justifyContent: 'space-between',
    }
  };

  return (
    <div style={styles.container}>
      <Card style={styles.card}>
        <CardHeader style={styles.cardHeader}>
          <CardTitle>APPOINTMENT SUMMARY</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            <div>
              <h2 style={styles.title}>Selected Services</h2>
              <ul>
                {selectedHaircuts.map((service, index) => (
                  <li key={index} style={styles.listItem}>
                    <strong>{service.name}</strong> - {service.duration} mins - Ksh {service.price}
                  </li>
                ))}
                {selectedFacialTreatments.map((service, index) => (
                  <li key={index} style={styles.listItem}>
                    <strong>{service.name}</strong> - {service.duration} mins - Ksh {service.price}
                  </li>
                ))}
                {selectedColors.map((service, index) => (
                  <li key={index} style={styles.listItem}>
                    <strong>{service.name}</strong> - {service.duration} mins - Ksh {service.price}
                  </li>
                ))}
                {selectedTreatments.map((service, index) => (
                  <li key={index} style={styles.listItem}>
                    <strong>{service.name}</strong> - {service.duration} mins - Ksh {service.price}
                  </li>
                ))}
              </ul>
            </div>
            <Separator className="my-4" />
            <div>
              <p style={styles.staff}>Selected Staff: {selectedStaff.first_name}</p>
              <p style={styles.dateTime}>Date: {date.toLocaleDateString()}</p>
              <p style={styles.dateTime}>Time Slot: {selectedTimeSlot}</p>
            </div>
            <Separator className="my-4" />
            <div>
              <p style={styles.total}>Total: Ksh {new Intl.NumberFormat('en-KE', { style: 'decimal', minimumFractionDigits: 0 }).format(total)}</p>
            </div>
          </CardDescription>
        </CardContent>
        <CardFooter style={styles.footer}>
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
  [selectedHaircuts, selectedFacialTreatments, selectedColors, selectedTreatments].forEach(services => {
    services.forEach(service => {
      const price = Number(service.price);
      if (!isNaN(price)) {
        total += price;
      }
    });
  });
  return total;
}

export default Cart;
