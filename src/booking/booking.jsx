import "./booking.css";
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import BookAppointment from './bookappointment';
import CustomerDetails from './customerdetails';
import Cart from './cart';
import { Button } from "@/components/ui/button";
import Grid from '@mui/material/Grid';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) {
    return "Good morning";
  } else if (hour < 18) {
    return "Good afternoon";
  } else if (hour < 22) {
    return "Good evening";
  } else {
    return "Good night";
  }
}

function Booking() {
  const [options, setOptions] = useState([]);
  const [staffOptions, setStaffOptions] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const greeting = getGreeting();

  const [selectedHaircuts, setSelectedHaircuts] = useState([]);
  const [selectedFacialTreatments, setSelectedFacialTreatments] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedTreatments, setSelectedTreatments] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState({});

  const customStyles = {
    control: (base) => ({
      ...base,
      borderRadius: '10px',
    }),
    menu: (base) => ({
      ...base,
      borderRadius: '10px',
    }),
    option: (base) => ({
      ...base,
      borderRadius: '10px',
    }),
  };

  useEffect(() => {
    const fetchServices = async () => {
      const response = await fetch('http://127.0.0.1:8000/services/');
      const data = await response.json();
      const formattedOptions = data.map(service => ({
        value: service.id,
        label: `${service.name} (${service.duration} mins) - Ksh${service.price}`,
        category: service.description,
        name: service.name,
        duration: service.duration,
        price: service.price,
      }));
      setOptions(formattedOptions);
    };

    const fetchStaff = async () => {
      const response = await fetch('http://127.0.0.1:8000/staff');
      const data = await response.json();
      const formattedStaffOptions = data.map(staff => ({
        value: staff.id,
        label: staff.first_name,
      }));
      setStaffOptions(formattedStaffOptions);
    };

    fetchServices();
    fetchStaff();
  }, []);

  const filterServicesByCategory = (category) => {
    return options
      .filter(service => service.category === category)
      .map(service => ({
        value: service.value,
        label: service.label,
        name: service.name,
        duration: service.duration,
        price: service.price,
      }));
  };

  const toggleView = () => {
    setShowCart(!showCart);
  };

  const handleStaffChange = (selectedOption) => {
    setSelectedStaff({
      id: selectedOption.value,
      first_name: selectedOption.label,
    });
  };

  const handleHaircutChange = (selectedOptions) => {
    setSelectedHaircuts(selectedOptions);
  };

  const handleFacialTreatmentChange = (selectedOptions) => {
    setSelectedFacialTreatments(selectedOptions);
  };

  const handleColorChange = (selectedOptions) => {
    setSelectedColors(selectedOptions);
  };

  const handleTreatmentChange = (selectedOptions) => {
    setSelectedTreatments(selectedOptions);
  };

  return (
    <>
      <div className="greeting-container">
        <h1 className="mt-5 text-5xl font-bold text-center">
          <span className="text-[#fbd137] transition-all duration-500 ease-in-out transform hover:scale-110 font-poppins rounded-lg animate-fadeIn">Hello there!</span>
          <span className="text-gray-500"> {greeting}</span>
        </h1>
        <p className="mt-4 text-lg text-gray-500 animate-fadeIn delay-150 duration-700">Ready to make your day better? <a href="#appointment" className="text-[#fbd137] font-semibold underline">Book an appointment with us!</a></p>
      </div>
      <div className="container">
        <Grid container direction={{ xs: 'column', md: 'row' }} justifyContent="center" alignItems="center">
          {!showCart ? (
            <Grid item xs={12} md={3} p={2}>
              <div className="select">
                <h1 className="font-bold text-xl">BOOK APPOINTMENT</h1>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <div className="multiselect-container">
                      <h2>Hair Cut</h2>
                      <Select
                        isMulti
                        name="Haircut"
                        options={filterServicesByCategory('Hair Cut')}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        placeholder="Select Hair Cut"
                        styles={customStyles}
                        onChange={handleHaircutChange}
                        value={selectedHaircuts}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <div className="multiselect-container1">
                      <h2>Facial Treatment</h2>
                      <Select
                        isMulti
                        name="FacialTreatment"
                        options={filterServicesByCategory('Facial Treatment')}
                        className="basic-multi-select1"
                        classNamePrefix="select"
                        placeholder="Select Facial Treatment"
                        styles={customStyles}
                        onChange={handleFacialTreatmentChange}
                        value={selectedFacialTreatments}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <div className="multiselect-container2">
                      <h2>Color</h2>
                      <Select
                        isMulti
                        name="Color"
                        options={filterServicesByCategory('Color')}
                        className="basic-multi-select2"
                        classNamePrefix="select"
                        placeholder="Select Color"
                        styles={customStyles}
                        onChange={handleColorChange}
                        value={selectedColors}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <div className="multiselect-container3">
                      <h2>Treatment</h2>
                      <Select
                        isMulti
                        name="Treatment"
                        options={filterServicesByCategory('Treatment')}
                        className="basic-multi-select3"
                        classNamePrefix="select"
                        placeholder="Select Treatment"
                        styles={customStyles}
                        onChange={handleTreatmentChange}
                        value={selectedTreatments}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <div className="multiselect-container4">
                      <h2>Staff</h2>
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
                            primary: 'black',
                          },
                        })}
                        styles={customStyles}
                        onChange={handleStaffChange}
                        value={selectedStaff.id ? { value: selectedStaff.id, label: selectedStaff.first_name } : null} // Adjust for single select
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <BookAppointment />
                  </Grid>
                  <Grid item xs={12}>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100%',
                      marginTop: '20px'
                    }}>
                      <Button onClick={toggleView} style={{
                        marginTop: '40px',
                        padding: "5px 16px",
                        width: '200px'
                      }}>Continue to Cart</Button>
                      <div style={{ margin: '5px' }}>OR</div>
                      <CustomerDetails buttonText={'Proceed to Book Now'} />
                    </div>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          ) : (
            <Grid item xs={12} md={12} p={2}>
              <Cart
                toggleView={toggleView}
                selectedStaff={selectedStaff}
                selectedHaircuts={selectedHaircuts}
                selectedFacialTreatments={selectedFacialTreatments}
                selectedColors={selectedColors}
                selectedTreatments={selectedTreatments}
              />
            </Grid>
          )}
        </Grid>
      </div>
    </>
  );
}

export default Booking;