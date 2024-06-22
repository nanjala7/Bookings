import React, { createContext, useState } from 'react';

const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {
    const [date, setDate] = useState(new Date());
    const [selectedTimeSlot, setSelectedTimeSlot] = useState();

    const updateAppointment = (newDate, newTimeSlot) => {
        setDate(newDate);
        setSelectedTimeSlot(newTimeSlot);
    };

    const value = {
        date,
        setDate,
        selectedTimeSlot,
        setSelectedTimeSlot,
        updateAppointment, // Include the function in the context value
    };

    return (
        <AppointmentContext.Provider value={value}>
            {children}
        </AppointmentContext.Provider>
    );
};

export default AppointmentContext;