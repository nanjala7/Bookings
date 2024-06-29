import React, { useState, useEffect } from 'react';
import { Calendar } from "@/components/ui/calendar";
import "./booking.css";
import useAppointment from '@/hooks/useAppointment'; 
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock } from 'lucide-react';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';

function BookAppointment() {
    const [date, setDate] = useState(new Date());
    const [timeSlot, setTimeSlot] = useState([]);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState();

    const { updateAppointment } = useAppointment();

    const handleSubmit = () => {
        if (date && selectedTimeSlot) {
            updateAppointment(date, selectedTimeSlot);
            // Navigate to the Cart component or perform other actions as needed
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
        <Dialog>
            <DialogTrigger>
                <Button className="DT button">
                    Select date & time
                </Button>
            </DialogTrigger>
<DialogContent className="scrollable-dialog-content max-w-full sm:max-w-md">
    <DialogHeader>
        <DialogTitle className="text-center text-sm sm:text-lg">
            Select date and time
        </DialogTitle>
        <DialogDescription>
            <div className="flex flex-col sm:flex-row gap-2">
                {/* Calendar Section */}
                <div className="flex-1 mb-4">
                    <h2 className="flex items-center gap-2 text-sm sm:text-base">
                        <CalendarDays className="h-5 w-5" style={{ color: '#fbd137' }} />
                        Select Date
                    </h2>
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={isPastDay}
                        className="rounded-md border"
                    />
                </div>

                {/* Time Slots Section */}
                <div className="flex-1 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    <h2 className="flex gap-3 items-center col-span-2 sm:col-span-4 text-sm sm:text-base">
                        <Clock className="h-5 w-5" style={{ color: '#fbd137' }} />
                        Select Time Slot
                    </h2>
                    {/* Time Slots Display Adjusted for Responsiveness */}
                    <div className="border rounded-lg p-2 col-span-2 sm:col-span-4">
                        <h3 className="text-center mb-2 text-sm sm:text-base">Time Slots</h3>
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                            {timeSlot.map((item, index) => (
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
    <DialogFooter className="justify-center sm:justify-end">
        <DialogClose asChild>
            <Button type="button" className="bg-yellow-400 text-black text-sm sm:text-base" disabled={!(date && selectedTimeSlot)} onClick={handleSubmit}>
                Submit
            </Button>
        </DialogClose>
    </DialogFooter>
</DialogContent>
        </Dialog>
    );
}

export default BookAppointment;
