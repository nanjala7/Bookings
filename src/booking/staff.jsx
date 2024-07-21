import React, { useState, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField, createTheme, ThemeProvider } from '@mui/material';
import Select from 'react-select';
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import dayjs from 'dayjs';
import BookAppointment from './bookappointment';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import './staff.css';

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          width: '80%',
          marginTop: '1rem',
          '& .MuiInputBase-root': {
            borderRadius: '1rem',
            padding: '0.5rem',
            fontSize: '1.25rem',
            width: '100%',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#fbd137',
          },
          '& .MuiInputLabel-root': {
            color: '#000000',
            fontSize: '1.25rem',
          },
          '& .MuiSvgIcon-root': {
            color: '#000000',
            fontSize: '2rem',
          },
        },
      },
    },
    MuiPickersCalendarHeader: {
      styleOverrides: {
        root: {
          fontSize: '1.2rem',
          color: '#333',
        },
      },
    },
    MuiPickersDay: {
      styleOverrides: {
        root: {
          fontSize: '1.25rem',
          color: '#333',
          borderRadius: '50%',
          '&:hover': {
            backgroundColor: '#fbd137',
          },
          '&.Mui-selected': {
            backgroundColor: '#fbd137',
          },
        },
      },
    },
    MuiPickersClockPointer: {
      styleOverrides: {
        pointer: {
          backgroundColor: '#fbd137',
        },
      },
    },
    MuiPickersClock: {
      styleOverrides: {
        number: {
          color: '#333',
        },
      },
    },
  },
});

const customStyles = {
  control: (base) => ({
    ...base,
    width: '100%',
    minHeight: '50px',
    fontSize: '1.25rem',
    borderColor: '#fbd137',
    borderRadius: '12px',
    '&:hover': {
      borderColor: '#fbd137',
    },
  }),
  menu: (base) => ({
    ...base,
    borderRadius: '10px',
    width: '100%',
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? '#fbd137' : '#fff',
    color: '#333',
    borderRadius: '12px',
    '&:hover': {
      backgroundColor: '#fbd137',
    },
  }),
};

function Staff({ selectedStaff, setSelectedStaff, bookingNotes, setBookingNotes, handleNext, handleBack }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [content, setContent] = useState('');
  const [staffOptions, setStaffOptions] = useState([]);

  const fetchStaff = async () => {
    const response = await fetch('https://proartist-f6c2dfe5c27a.herokuapp.com/staff');
    const data = await response.json();
    const formattedStaffOptions = data.map((staff) => ({
      value: staff.id,
      label: staff.first_name,
    }));
    setStaffOptions(formattedStaffOptions);
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleSubmit = () => {
    handleNext(selectedDate, selectedTimeSlot, bookingNotes);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="card-container">
        <h1 className="card-header">Select date, time and staff</h1>
        <p className="card-content">{content}</p>
        <div className="multiselect-container4">
          <Select
            name="Staff"
            options={staffOptions}
            className="basic-single"
            classNamePrefix="select"
            placeholder="Select staff"
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                primary25: '#fbd137',
                primary: '#fbd137',
              },
            })}
            styles={customStyles}
            onChange={(selectedOption) => setSelectedStaff(selectedOption)}
            value={selectedStaff?.value ? { value: selectedStaff.value, label: selectedStaff.label } : null}
          />
        </div>
        <BookAppointment
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedTimeSlot={selectedTimeSlot}
          setSelectedTimeSlot={setSelectedTimeSlot}
        />
        <div className="grid w-full gap-3 mt-8">
          <Label htmlFor="message">Booking notes</Label>
          <Textarea
            placeholder="Type your message here, e.g. allergies,..."
            id="message"
            className="h-48"
            value={bookingNotes}
            onChange={(e) => setBookingNotes(e.target.value)}
          />
        </div>
        <div className="button-container">
          <Button variant="text" onClick={handleBack} className="back-button">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Go back
          </Button>
          <Button onClick={handleSubmit} className="continue-button">
            Continue
          </Button>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Staff;
