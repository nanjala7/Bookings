import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import BookAppointment from './bookappointment';
import CustomerDetails from './customerdetails';
import Cart from './cart';
import Staff from './staff';  // Import the Staff component
import { Button } from "@/components/ui/button";
import Grid from '@mui/material/Grid';
import ProgressMobileStepper from './progressMobileStepper';
import { Height } from '@mui/icons-material';


function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) {
    return "Good Morning";
  } else if (hour < 18) {
    return "Good Afternoon";
  } else if (hour < 22) {
    return "Good Evening";
  } else {
    return "Good Night";
  }
}

function Booking() {
  const [options, setOptions] = useState([]);
  const [staffOptions, setStaffOptions] = useState([]);
  const greeting = getGreeting();

  const [selectedHaircuts, setSelectedHaircuts] = useState([]);
  const [selectedFacialTreatments, setSelectedFacialTreatments] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedTreatments, setSelectedTreatments] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [activeStep, setActiveStep] = useState(0);

  const customStyles = {
    control: (base) => ({
      ...base,
      
      borderColor: '#fbd137',
      borderRadius: '12px',
      '&:hover': {
        borderColor: '#fbd137',
       
      },
    }),
    menu: (base) => ({
      ...base,
      borderRadius: '10px',
    }),
    option: (base, state) => ({
      ...base,
      borderRadius: '10px',
      backgroundColor: state.isFocused ? '#fbd137' : '#fff',
    color: '#333',
   
   
    '&:hover': {
      backgroundColor: '#fbd137',
      
    },
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

  const handleNext = () => {
    setActiveStep((prevActiveStep) => Math.min(prevActiveStep + 1, 4));
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => Math.max(prevActiveStep - 1, 0));
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const paginate = (items) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  const totalPages = Math.ceil(options.length / itemsPerPage);

  return (
    <>
      <div className="greeting-container">
        <h1 className="mt-4 text-xl sm:text-2xl md:text-5xl lg:text-6xl font-bold text-center">
          <span className="text-[#fbd137] transition-all duration-500 ease-in-out transform hover:scale-110 font-poppins rounded-lg animate-fadeIn">Hello there!</span>
          <span className="text-gray-500"> {greeting}</span>
        </h1>
        <p className="mt-3 sm:text-sm md:text-lg lg:text-2xl xl:text-3xl 2xl:text-4xl text-gray-500 animate-fadeIn delay-150 duration-700" style={{ fontSize: '0.65rem' }}>Ready to make your day better? <a href="#appointment" className="text-[#fbd137] font-semibold underline">Book an appointment with us!</a></p>
      </div>
      <ProgressMobileStepper activeStep={activeStep} handleNext={handleNext} handleBack={handleBack} />
      <div className="main-container">
        <Grid container direction="column" justifyContent="center" alignItems="center">
          {activeStep === 0 && (
            <Grid item xs={12} p={2}>
              <div className="select">
                <h1 className="font-bold text-xl">Services</h1>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <h2 className="haircut">Hair Cut</h2>
                    <div className="multiselect-container">
                      <Select
                        isMulti
                        name="Haircut"
                        options={paginate(filterServicesByCategory('Hair Cut'))}
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
                          options={paginate(filterServicesByCategory('Facial Treatment'))}
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
                        options={paginate(filterServicesByCategory('Color'))}
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
                    <h2 className="treatment">Treatment</h2>
                    <div className="multiselect-container3">
                      <Select
                        isMulti
                        name="Treatment"
                        options={paginate(filterServicesByCategory('Treatment'))}
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
                    <div style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: '30px'
                    }}>
                      <Button onClick={handleNext} style={{
                        marginTop: '1cm',
                        
                        padding: "5px 16px",
                        width: '200px',
                        border: '2px solid #6c757d',
                        backgroundColor: '#fbd137',
                       
                      }}>Continue</Button>
                    </div>
                  </Grid>

                </Grid>
              </div>
            </Grid>
          )}
          
          {activeStep === 1 && (
            <Grid item xs={12} p={2}>
              <Staff selectedStaff={selectedStaff} setSelectedStaff={setSelectedStaff}  handleNext={handleNext} handleBack={handleBack}/>

              
            </Grid>
          )}
          {activeStep === 2&& (
            <Grid item xs={12} p={2}>
              <Cart
                selectedStaff={selectedStaff}
                selectedHaircuts={selectedHaircuts}
                selectedFacialTreatments={selectedFacialTreatments}
                selectedColors={selectedColors}
                selectedTreatments={selectedTreatments}
                selectedDate={selectedDate}
                selectedTimeSlot={selectedTimeSlot}
                handleBack={handleBack}
              />
              
             
            </Grid>
          )}
        </Grid>
      </div>
    </>
  );
}

export default Booking;
