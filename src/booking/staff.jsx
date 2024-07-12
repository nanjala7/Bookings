import React, { useState, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField, createTheme, ThemeProvider } from '@mui/material';
import Select from 'react-select';
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import dayjs from 'dayjs';
import BookAppointment from './bookappointment';

// Define styles outside of the component to keep the code clean
const cardStyle = {
  width: '80%',
  borderRadius: '1rem',
  boxShadow: '0px 15px 20px #999',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'white',
  padding: '1rem',
  height: '18cm',
  marginLeft: '2.7cm',
  maxWidth: '50rem',
};

const headerStyle = {
  fontSize: '1.125rem',
  lineHeight: '1.75rem',
  fontFamily: 'var(--mantine-font-family)',
  backgroundColor: 'hsl(var(--muted)/0.5)',
  padding: '1.5rem',
  color: 'black',
  margin: '0',
  fontWeight: 'bold',
};

const contentStyle = {
  fontSize: '1rem',
  lineHeight: '1.5rem',
  fontFamily: 'var(--mantine-font-family)',
  color: '#333',
  margin: '1rem 0',
};

// Custom theme for the DateTimePicker
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
            width: '18cm',
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

// Custom styles for the Select component
const customStyles = {
  control: (base) => ({
    ...base,
    width: '18cm',
    minHeight: '70px',
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
    width: '18cm',
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

// Functional component for Staff
function Staff({ selectedStaff, setSelectedStaff, handleNext, handleBack }) {
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
    alert(`Selected Staff ID: ${selectedStaff?.value}, Date: ${selectedDate}, Time Slot: ${selectedTimeSlot}`);
    handleNext();
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={cardStyle}>
        <h1 style={headerStyle}>Select date, time and staff</h1>
        <p style={contentStyle}>{content}</p>
        <BookAppointment
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedTimeSlot={selectedTimeSlot}
          setSelectedTimeSlot={setSelectedTimeSlot}
        />
        <div className="multiselect-container4" style={{ marginTop: '3rem', width: '65rem' }}>
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
            value={selectedStaff.value ? { value: selectedStaff.value, label: selectedStaff.label } : null}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
          <Button 
            variant="text" 
            onClick={handleBack} 
            style={{ padding: '0.5rem 1rem',marginTop:'8cm'}}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Go back
          </Button>
          <Button
            onClick={handleSubmit}
            style={{
              padding: '5px 16px',
              width: '200px',
              border: '2px solid #6c757d',
              backgroundColor: '#fbd137',
              marginTop:'8cm',
            }}
          >
            Continue
          </Button>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Staff;
