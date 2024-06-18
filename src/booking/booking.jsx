import "./booking.css";
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import BookAppointment from './bookappointment';
import Cart from './cart';

function Booking() {
  const [options, setOptions] = useState([]);
  const [staffOptions, setStaffOptions] = useState([]);


  const customStyles = {
    control: (base) => ({
      ...base,
      borderRadius: '10px', // Adjust this value for desired corner roundness
    }),
    menu: (base) => ({
      ...base,
      borderRadius: '10px', // Match the control's border radius
    }),
    option: (base) => ({
      ...base,
      borderRadius: '10px', // Optional: if you want each option to also have rounded corners
    }),
  };
  
  useEffect(() => {
    const fetchServices = async () => {
      const response = await fetch('http://127.0.0.1:8000/services/');
      const data = await response.json();
      // Adjusted mapping to match the provided API response structure
      const formattedOptions = data.map(service => ({
        value: service.id,
        label: `${service.name} (${service.duration} mins) - Ksh${service.price}`,
        category: service.description, // Include category field
      }));
      setOptions(formattedOptions);
    };
  
    const fetchStaff = async () => {
      const response = await fetch('http://127.0.0.1:8000/staff');
      const data = await response.json();
      const formattedStaffOptions = data.map(staff => ({
        value: staff.id, // Assuming there's an id field
        label: staff.first_name, // Assuming there's a name field
      }));
      setStaffOptions(formattedStaffOptions);
    };
  
    fetchServices();
    fetchStaff();
  }, []);


const filterServicesByCategory = (category) => {
  return options
    .filter(service => service.category === category) // This now works because `category` is part of options
    .map(service => ({
      value: service.value, // Use value from the option itself
      label: service.label, // Use label from the option itself
      // No need to reconstruct these from service details
    }));
};
  
  

  
  return (
    <div className="container">
      <header className="header">
        <div className="logo-container">
          <img
            src="https://www.miosalon.com/couponimages/2024/01/23/92e13d01e6b2718aab8030c645fad017.jpg"
            alt="Company Logo"
            className="logo"
          />
          <span className="logo-label">Mancave NSK</span>
        </div>

        <div className="location-container">
          <img
            src="https://cdn-icons-png.freepik.com/256/230/230979.png?ga=GA1.1.458427555.1716878739&semt=ais_hybrid\\\\\\\\\\\\\"
            alt="location Logo"
            className="location"
          />
          <span className="location-label">Nairobi Street Kitchen, Westlands</span>
        </div>
             
        <nav>
          <ul>
            <a href="/">Change Branch</a>
          </ul>
        </nav>

        <div className="time-container">
          <img
            src="https://cdn-icons-png.flaticon.com/128/13/13435.png"
            alt="time Logo"
            className="time"
          />
          <span className="time-label">10:00 AM to 10:00 PM</span>
        </div>
        <hr className="divider" />
        
        <div className="instant-container">
          <img
            src="https://cdn-icons-png.flaticon.com/128/6853/6853834.png"
            alt="instant Logo"
            className="instant"
          />
          <span className="instant-label">Instant booking <p className="instant1-label">No Queue at store</p></span>
        </div>

        <div className="now-container">
          <img
            src="https://cdn-icons-png.flaticon.com/128/12400/12400799.png"
            alt="now Logo"
            className="now"
          />
          <span className="now-label">Book Now <p className="now1-label">pay at store</p></span>
        </div>

        <div className="guest-container">
          <img
            src="https://cdn-icons-png.flaticon.com/128/3917/3917559.png"
            alt="guest Logo"
            className="guest"
          />
          <span className="guest-label">Guest Booking <p className="guest1-label">no account required</p></span>
        </div>
        <div className="image-container">
          <img
            src="/mancave1.jpg"
            alt="guest Logo"
            className="image"
          />
        </div>
      </header>

      <div className="select">
        <h1>SERVICES</h1>

        <div className="multiselect-container">
          <h2> Hair Cut </h2>
          <Select
            isMulti
            name="Haircut"
            options={filterServicesByCategory('Hair Cut')}
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="Select Hair Cut"
            styles={customStyles}
          />
        </div>

        <div className="multiselect-container1">
          <h2> Facial Treatment </h2>
          <Select
            isMulti
            name="FacialTreatment"
            options={filterServicesByCategory('Facial Treatment')}
            className="basic-multi-select1"
            classNamePrefix="select"
            placeholder="Select Facial Treatment"
            styles={customStyles}
          />
        </div>

        <div className="multiselect-container2">
          <h2> Color </h2>
          <Select
            isMulti
            name="Colour"
            options={filterServicesByCategory('Color')}
            className="basic-multi-select2"
            classNamePrefix="select"
            placeholder="Select Colour"
            styles={customStyles}
          />
        </div>

        <div className="multiselect-container3">
          <h2> Treatment </h2>
          <Select
            isMulti
            name="Treatment"
            options={filterServicesByCategory('Treatment')}
            className="basic-multi-select3"
            classNamePrefix="select"
            placeholder="Select Treatment"
            styles={customStyles}
          />
        </div>
        
        <div className="multiselect-container4">
          <h2> Staff </h2>
          <Select
    isMulti
    name="Staff"
    options={staffOptions} // Use staffOptions here
    className="basic-multi-select4"
    classNamePrefix="select"
    placeholder="Select staff"
    styles={customStyles}
          />
        </div>
        <div>
        <BookAppointment/>
        </div>
        <div>
<Cart style={{ width: '50px', height: '50px' }}/>
        </div>
      </div>
    </div>
  );
}

export default Booking;