import React, { useState, useEffect } from 'react';
import { Calendar } from "@/components/ui/calendar";
import "./booking.css";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock } from 'lucide-react';

function BookAppointment({ selectedDate, setSelectedDate, selectedTimeSlot, setSelectedTimeSlot, handleNext }) {
    const [timeSlot, setTimeSlot] = useState([]);

    const handleSubmit = () => {
        if (selectedDate && selectedTimeSlot) {
            // Perform actions as needed
            handleNext();
        }
    };

    useEffect(() => {
        getTimeSlots();
    }, []);

    const getTimeSlots = () => {
        const timeList = [];

        // Early Hours: 10:00 AM to 3:45 PM
        for (let i = 10; i <= 11; i++) {
            timeList.push({ time: `${i}:00 AM` });
            timeList.push({ time: `${i}:15 AM` });
            timeList.push({ time: `${i}:30 AM` });
            timeList.push({ time: `${i}:45 AM` });
        }

        // Noon time slots (PM)
        timeList.push({ time: `12:00 PM` });
        timeList.push({ time: `12:15 PM` });
        timeList.push({ time: `12:30 PM` });
        timeList.push({ time: `12:45 PM` });

        // Afternoon time slots (PM)
        for (let i = 1; i <= 3; i++) {
            timeList.push({ time: `${i}:00 PM` });
            timeList.push({ time: `${i}:15 PM` });
            timeList.push({ time: `${i}:30 PM` });
            timeList.push({ time: `${i}:45 PM` });
        }

        // Late Hours: 4:00 PM to 9:45 PM
        for (let i = 4; i <= 8; i++) {
            if (i === 9) continue;
            timeList.push({ time: `${i}:00 PM` });
            timeList.push({ time: `${i}:15 PM` });
            timeList.push({ time: `${i}:30 PM` });
            timeList.push({ time: `${i}:45 PM` });
        }

        setTimeSlot(timeList);
    };

    const isPastDay = (day) => {
        return day < new Date();
    };

    return (
        <div className="card p-4 mx-auto" style={{ minWidth: '20cm', minHeight: '20.4cm' }}>
            <h2 className="text-center text-xl mb-4">Select date and time</h2>
            <div className="flex flex-col md:flex-row gap-2">
                {/* Calendar Section */}
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

                {/* Time Slots Section */}
                <div className="flex-1 grid grid-cols-1 gap-2">
                    <h2 className="flex gap-3 items-center text-sm sm:text-base">
                        <Clock className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: '#fbd137' }} />
                        Select Time Slot
                    </h2>
                    {/* Early Hours Section */}
                    <div className="border rounded-lg p-1 sm:p-2">
                        <h3 className="text-center mb-1 sm:mb-2 text-xs sm:text-sm">Early Hours</h3>
                        <div className="grid grid-cols-4 gap-1 sm:gap-2">
                            {timeSlot?.filter((item) => {
                                const hour = parseInt(item.time.split(':')[0], 10);
                                const period = item.time.split(' ')[1];
                                return (period === 'AM' || (period === 'PM' && (hour === 12 || hour <= 3)));
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

                    {/* Late Hours Section */}
                    <div className="border rounded-lg p-1 sm:p-2">
                        <h3 className="text-center mb-1 sm:mb-2 text-xs sm:text-sm">Late Hours</h3>
                        <div className="grid grid-cols-4 gap-1 sm:gap-2">
                            {timeSlot?.filter((item) => {
                                const hour = parseInt(item.time.split(':')[0], 10);
                                const period = item.time.split(' ')[1];
                                return (period === 'PM' && hour >= 4 && hour !== 12);
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
            <div className="flex justify-end mt-4">
            <Button
                type="button"
                className="bg-yellow-400 text-black text-xs sm:text-sm mt-4"
                disabled={!(selectedDate && selectedTimeSlot)}
                onClick={handleSubmit}
            >
                Submit
            </Button>
            </div>
        </div>
    );
}

export default BookAppointment;
