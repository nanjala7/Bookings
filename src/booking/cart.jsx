// src/components/Cart.js
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import CustomerForm from './customerform';
import CustomerDetails from './customerdetails';
import styled from 'styled-components';
import AppointmentContext from '../context/AppointmentContext';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    max-height: 18cm;
    padding-top: 1rem;
    width: 62rem;
    padding: 0 5%;
    box-sizing: border-box;
    @media (max-width: 600px) {
        flex-direction: column;
        padding-top: 1rem;
        width: 100%;
        max-height: 100%;
    }
     @media (max-width: 768px) {
        width: 100%;
    }
`;

const StyledCard = styled(Card)`
    padding: 1rem;
    width: 80%;
    min-height: 18cm;
    max-width: 50rem;
    margin-top: -0.8rem;
    margin-left: -1rem;
    border-radius: 1rem;
    box-shadow: 0px 15px 20px #999;
    overflow-y: auto;
    max-height: calc(100vh - 4rem); /* Ensure the card doesn't grow beyond the viewport height */
    @media (max-width: 768px) {
        width: 118%;
        margin-left: -0.7cm;
        margin-top: -1cm;
        max-height: 70vh; /* Adjusted height for smaller screens */
        padding-top: 1rem;
    }
           @media (max-width: 600px) {
        width: 340px;
        margin-left: -25px;
        margin-top: -2rem;
        max-height: 70vh; /* Adjusted height for smaller screens */
    }
`;

const CardHeaderStyled = styled(CardHeader)`
    background-color: #f5f5f5;
`;

const Title = styled.h2`
    font-size: 24px;
    margin-bottom: 25px;
    margin-top: 25px;
    font-weight: bold;
    color: #333;
    @media (max-width: 600px) {
        font-size: 15px;
    }
`;

const ListItem = styled.li`
    font-size: 18px;
    margin-bottom: 15px;
    @media (max-width: 600px) {
        font-size: 15px;
    }
`;

const Staff = styled.p`
    font-size: 24px;
    margin-bottom: 25px;
    color: #333;
    font-weight: bold;
    @media (max-width: 600px) {
        font-size: 15px;
    }
`;

const DateTime = styled.p`
    font-size: 20px;
    margin-bottom: 20px;
    font-weight: bold;
    color: #333;
    @media (max-width: 600px) {
        font-size: 15px;
    }
`;

const BookingNotes = styled.p`
    font-size: 18px;
    font-family: 'Courier New', Courier, monospace;
    color: #666;
    margin-top: 15px;
    @media (max-width: 600px) {
        font-size: 15px;
    }
`;

const Total = styled.p`
    font-size: 20px;
    font-weight: bold;
    color: #333;
    @media (max-width: 600px) {
        font-size: 15px;
    }
`;

const Footer = styled(CardFooter)`
    display: flex;
    justify-content: space-between;
    margin-top: 6.5cm;
    @media (max-width: 600px) {
        margin-top: 4cm;
        margin-left: -1cm;
        flex-direction: row;
        align-items: center;
    }
    & > *:not(:last-child) {
        margin-right: 1rem;
    }
`;

function Cart({ handleBack, selectedStaff, selectedHaircuts, selectedFacialTreatments, selectedColors, selectedTreatments, bookingNotes }) {
    const { selectedDate, selectedTimeSlot } = useContext(AppointmentContext);
    const total = calculateTotal(selectedHaircuts, selectedFacialTreatments, selectedColors, selectedTreatments);

    return (
        <Container>
            <StyledCard>
                <CardHeaderStyled>
                    <CardTitle>APPOINTMENT SUMMARY</CardTitle>
                </CardHeaderStyled>
                <CardContent>
                    <CardDescription>
                        <div>
                            <Title>Selected Services:</Title>
                            <ul>
                                {selectedHaircuts.map((service, index) => (
                                    <ListItem key={index}>
                                        <strong>{service.name}</strong> - {service.duration} mins - Ksh {service.price}
                                    </ListItem>
                                ))}
                                {selectedFacialTreatments.map((service, index) => (
                                    <ListItem key={index}>
                                        <strong>{service.name}</strong> - {service.duration} mins - Ksh {service.price}
                                    </ListItem>
                                ))}
                                {selectedColors.map((service, index) => (
                                    <ListItem key={index}>
                                        <strong>{service.name}</strong> - {service.duration} mins - Ksh {service.price}
                                    </ListItem>
                                ))}
                                {selectedTreatments.map((service, index) => (
                                    <ListItem key={index}>
                                        <strong>{service.name}</strong> - {service.duration} mins - Ksh {service.price}
                                    </ListItem>
                                ))}
                            </ul>
                        </div>
                        <Separator className="my-4" />
                        <div>
                            <Staff>Selected Staff: {selectedStaff.label}</Staff>
                            <DateTime>Date: {selectedDate?.toLocaleDateString()}</DateTime>
                            <DateTime>Time Slot: {selectedTimeSlot}</DateTime>
                            <Staff>Booking notes: {bookingNotes}</Staff>
                        </div>
                        <Separator className="my-4" />
                        <div>
                            <Total>Total: Ksh {new Intl.NumberFormat('en-KE', { style: 'decimal', minimumFractionDigits: 0 }).format(total)}</Total>
                        </div>
                    </CardDescription>
                </CardContent>
                <Footer>
                    <Button variant="ghost" onClick={handleBack}>
                        <ChevronLeft className="mr-2 h-4 w-4" /> Go back
                    </Button>
                    <CustomerDetails
                        buttonText={'continue'}
                        selectedStaff={selectedStaff}
                        selectedHaircuts={selectedHaircuts}
                        selectedFacialTreatments={selectedFacialTreatments}
                        selectedColors={selectedColors}
                        selectedTreatments={selectedTreatments}
                        date={selectedDate}
                        selectedTimeSlot={selectedTimeSlot}
                        total={total}
                    />
                </Footer>
            </StyledCard>
        </Container>
    );
}

Cart.propTypes = {
    handleBack: PropTypes.func.isRequired,
    selectedStaff: PropTypes.shape({
        label: PropTypes.string.isRequired,
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
    bookingNotes: PropTypes.string.isRequired,
};

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
