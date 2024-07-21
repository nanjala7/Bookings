// src/context/AppointmentContext.js
import React, { createContext, useState, useMemo } from 'react';

const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('');

    const hasTimeSlotPassed = (slot) => {
        const [time, period] = slot.time.split(' ');
        let [hour, minute] = time.split(':').map(Number);
        if (period === 'PM' && hour !== 12) {
            hour += 12;
        } else if (period === 'AM' && hour === 12) {
            hour = 0;
        }
        const now = new Date();
        const selected = new Date(selectedDate);
        selected.setHours(hour, minute, 0, 0);
        return selected < now;
    };

    const value = useMemo(() => ({
        selectedDate,
        setSelectedDate,
        selectedTimeSlot,
        setSelectedTimeSlot,
        hasTimeSlotPassed
    }), [selectedDate, selectedTimeSlot]);

    return (
        <AppointmentContext.Provider value={value}>
            {children}
        </AppointmentContext.Provider>
    );
};

export default AppointmentContext;
