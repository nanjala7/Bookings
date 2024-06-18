
import "./booking.css";

import Select from 'react-select';
import  BookAppointment from './bookappointment';




function Booking() {

  
  const options = [
    {
      label: 'Hair Cut',
      options: [
        { value: 0, label: 'Gentlemen cut - $45' },
        { value: 1, label: 'Bespoke cut' },
        { value: 2, label: 'Beard/Mustache' },
        { value: 3, label: 'Line up' },
      ],
    },
    {
      label: 'Facial Treatment',
      options: [
        { value: 4, label: 'Facial treatment 1' },
        { value: 5, label: 'Facial treatment 2' },
        { value: 6, label: 'Facial treatment 3' },
      ],
    },
    {
      label: 'Colour',
      options: [
        { value: 7, label: 'Colour 1' },
        { value: 8, label: 'Colour 2' },
        { value: 9, label: 'Colour 3' },
      ],
    },
    {
      label: 'Treatment',
      options: [
        { value: 10, label: 'Treatment 1' },
        { value: 11, label: 'Treatment 2' },
        { value: 12, label: 'Treatment 3' },
      ],
    },
  ];
  
  
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
          src=" https://cdn-icons-png.freepik.com/256/230/230979.png?ga=GA1.1.458427555.1716878739&semt=ais_hybrid\\\\\\\\\\\\\"
          alt="location Logo"
          className="location"
        />
        <span className="location-label">Nairobi Street Kitchen , Westlands</span>
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
        options={options}
        className="basic-multi-select"
        classNamePrefix="select"
        placeholder="Select Hair Cut"
      />
       </div>

       <div className="multiselect-container1">
<h2> Facial Treatment </h2>
      <Select
      
        isMulti
        name="Haircut"
        options={options}
        className="basic-multi-select1"
        classNamePrefix="select"
        placeholder="Select Hair Cut"
      />
       </div>

       <div className="multiselect-container2">
<h2> Colour </h2>
      <Select
      
        isMulti
        name="Haircut"
        options={options}
        className="basic-multi-select2"
        classNamePrefix="select"
        placeholder="Select Hair Cut"
      />
       </div>

       <div className="multiselect-container3">
<h2> Treatment </h2>
      <Select
      
        isMulti
        name="Haircut"
        options={options}
        className="basic-multi-select3"
        classNamePrefix="select"
        placeholder="Select Hair Cut"
      />

      
       </div>
       
       <div className="multiselect-container4">
<h2> Staff </h2>
      <Select
      
        isMulti
        name="Haircut"
        options={options}
        className="basic-multi-select4"
        classNamePrefix="select"
        placeholder="Select staff"
      />



       </div>
    <BookAppointment/>
       </div>
       
        </div>

        
        
        
   
  );
}

export default Booking;