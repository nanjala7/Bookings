// src/components/BookAppointment.js
import React, { useState, useEffect, useContext } from 'react';
import { Calendar } from "@/components/ui/calendar";
import "./booking.css";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock } from 'lucide-react';
import AppointmentContext from '../context/AppointmentContext';

function BookAppointment() {
    const { selectedDate, setSelectedDate, selectedTimeSlot, setSelectedTimeSlot } = useContext(AppointmentContext);
    const [timeSlot, setTimeSlot] = useState([]);

    // Set initial date if not already selected
    useEffect(() => {
        if (!selectedDate) {
            setSelectedDate(new Date());  // Set today's date by default
        }
        getTimeSlots();
    }, []);

    const getTimeSlots = () => {
        const timeList = [];
        for (let i = 10; i <= 11; i++) {
            timeList.push({ time: `${i}:00 AM` });
            timeList.push({ time: `${i}:15 AM` });
            timeList.push({ time: `${i}:30 AM` });
            timeList.push({ time: `${i}:45 AM` });
        }
        timeList.push({ time: `12:00 PM` });
        timeList.push({ time: `12:15 PM` });
        timeList.push({ time: `12:30 PM` });
        timeList.push({ time: `12:45 PM` });
        for (let i = 1; i <= 3; i++) {
            timeList.push({ time: `${i}:00 PM` });
            timeList.push({ time: `${i}:15 PM` });
            timeList.push({ time: `${i}:30 PM` });
            timeList.push({ time: `${i}:45 PM` });
        }
        for (let i = 4; i <= 8; i++) {
            if (i === 9) continue;
            timeList.push({ time: `${i}:00 PM` });
            timeList.push({ time: `${i}:15 PM` });
            timeList.push({ time: `${i}:30 PM` });
            timeList.push({ time: `${i}:45 PM` });
        }
        timeList.push({ time: `9:00 PM` });
        setTimeSlot(timeList);
    };

    const isPastDay = (day) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return day < today;
    };

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

    return (
        <Dialog>
            <DialogTrigger>
                <Button style={{ padding: '1rem', borderRadius: '10px', height: '1.3cm', marginTop: '2rem', fontSize: '0.875rem', fontWeight: 'bold', backgroundColor: '#fbd137', color: 'black', width: '100%', maxWidth: '100%' }}>Select date & time</Button>
            </DialogTrigger>
            <DialogContent className="scrollable-dialog-content max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-center text-sm sm:text-base">
                        Select date and time
                    </DialogTitle>
                    <DialogDescription>
                        <div className="flex flex-col md:flex-row gap-2">
                            <div className="flex-1 mb-2 sm:mb-4">
                                <h2 className="flex items-center gap-2 text-sm sm:text-base">
                                    <CalendarDays className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: '#fbd137' }} />
                                    Select Date
                                </h2>
                                <Calendar
                                    mode="single"
                                    selected={selectedDate}
                                    onSelect={setSelectedDate}
                                    disabled={isPastDay}
                                    className="rounded-sm border"
                                />
                            </div>
                            <div className="flex-1 grid grid-cols-1 gap-2">
                                <h2 className="flex gap-3 items-center text-sm sm:text-base">
                                    <Clock className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: '#fbd137' }} />
                                    Select Time Slot
                                </h2>
                                <div className="border rounded-lg p-1 sm:p-2">
                                    <h3 className="text-center mb-1 sm:mb-2 text-xs sm:text-sm">Early Hours</h3>
                                    <div className="grid grid-cols-4 gap-1 sm:gap-2">
                                        {timeSlot?.filter((item) => {
                                            const hour = parseInt(item.time.split(':')[0], 10);
                                            const period = item.time.split(' ')[1];
                                            return !hasTimeSlotPassed(item) && (period === 'AM' || (period === 'PM' && (hour === 12 || hour <= 3)));
                                        }).map((item, index) => (
                                            <h2
                                                key={index}
                                                onClick={() => setSelectedTimeSlot(item.time)}
                                                className={`p-1 sm:p-2 text-center cursor-pointer hover:bg-yellow-400 hover:text-white border rounded-full text-xs sm:text-sm ${item.time === selectedTimeSlot ? 'bg-yellow-400 text-white' : ''}`}
                                            >
                                                {item.time}
                                            </h2>
                                        ))}
                                    </div>
                                </div>
                                <div className="border rounded-lg p-1 sm:p-2">
                                    <h3 className="text-center mb-1 sm:mb-2 text-xs sm:text-sm">Late Hours</h3>
                                    <div className="grid grid-cols-4 gap-1 sm:gap-2">
                                        {timeSlot?.filter((item) => {
                                            const hour = parseInt(item.time.split(':')[0], 10);
                                            const period = item.time.split(' ')[1];
                                            return !hasTimeSlotPassed(item) && (period === 'PM' && hour >= 4 && hour !== 12);
                                        }).map((item, index) => (
                                            <h2
                                                key={index}
                                                onClick={() => setSelectedTimeSlot(item.time)}
                                                className={`p-1 sm:p-2 text-center cursor-pointer hover:bg-yellow-400 hover:text-white border rounded-full text-xs sm:text-sm ${item.time === selectedTimeSlot ? 'bg-yellow-400 text-white' : ''}`}
                                            >
                                                {item.time}
                                            </h2>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-end">
                    <DialogClose asChild>
                        <Button type="button" className="bg-yellow-400 text-black text-xs sm:text-sm" disabled={!(selectedDate && selectedTimeSlot)}>
                            Submit
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default BookAppointment;
