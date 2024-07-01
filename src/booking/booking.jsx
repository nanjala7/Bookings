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
    return "Good Morning";
  } else if (hour < 18) {
    return "Good fternoon";
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
      const response = await fetch('https://proartist-f6c2dfe5c27a.herokuapp.com/services/');
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
      const response = await fetch('https://proartist-f6c2dfe5c27a.herokuapp.com/staff');
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

// Adjust the JSX to have headings on top of their respective select boxes

return (
  <>
<div className="greeting-container">
  <h1 className="mt-4 text-xl sm:text-2xl md:text-5xl lg:text-6xl font-bold text-center">
    <span className="text-[#fbd137] transition-all duration-500 ease-in-out transform hover:scale-110 font-poppins rounded-lg animate-fadeIn">Hello there!</span>
    <span className="text-gray-500"> {greeting}</span>
  </h1>
 <p className="mt-3 sm:text-sm md:text-lg lg:text-2xl xl:text-3xl 2xl:text-4xl text-gray-500 animate-fadeIn delay-150 duration-700" style={{ fontSize: '0.65rem' }}>Ready to make your day better? <a href="#appointment" className="text-[#fbd137] font-semibold underline">Book an appointment with us!</a></p>
</div>
    <div className="main-container">
      <Grid container direction={{ xs: 'column', md: 'row' }} justifyContent="center" alignItems="center">
        {!showCart ? (
          <Grid item xs={12} md={3} p={2}>
            <div className="select">
              <h1 className="font-bold text-xl">BOOK APPOINTMENT</h1>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <h2 className="haircut">Hair Cut</h2>
                  <div className="multiselect-container">
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
                  <div className="content-container">
                    <h2 className="facial">Facial Treatment</h2>
                    <div className="multiselect-container1">
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
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <h2 className="color">Color</h2>
                  <div className="multiselect-container2">
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
                  <div className="content-container3">
                  <h2 className="Treatment">Treatment</h2>
                  <div className="multiselect-container3">
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
                  </div>
                </Grid>
                   <Grid item xs={12}>
                    <h2 className="Staff">Staff</h2>
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
                    <div className="button-container" style={{
                      width:'50%',
                      display: 'flex',
                      justifyContent: 'center', // Center horizontally
                      alignItems: 'left', // Center vertically
                      marginTop: '30px' // Adjust spacing as needed
                    }}>
                     
                    </div>
                  
                    
                  </Grid>
                  <Grid item xs={12}>
                  <div><BookAppointment /></div>
                  </Grid>
                 
                 
                <Grid item xs={12}>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '50%',
                    marginTop: '20px'
                  }}>
              <Button onClick={toggleView} style={{
                marginTop: '8px',
                padding: "5px 16px",
                width: '200px',
border: '2px solid #6c757d', // Example: grey border
backgroundColor: '#e9ecef' // Example: lighter grey background// Example: light gray background
              }}>Continue to Cart</Button>
                    <div style={{ margin: '10px' }}>OR</div>
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