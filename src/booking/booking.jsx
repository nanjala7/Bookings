import "./booking.css";

function Booking() {

 

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

        <div class="services">
  <h1>Services</h1>
  
    <ul>
      <li><a href="/">Hair cut</a></li>
      <li><a href="/about">Facial Treatment</a></li>
      <li><a href="/services">Colour</a></li>
      <li><a href="/contact">Treatment</a></li>
    </ul>
  
</div>

<div className="listedservices">
        <h1>Hair Cut</h1>
        <form >
          <ul>
            <li>
              <label>
                <input type="radio" name="gentlemen" value="Gentlemen's Cut" />
                Gentlemen's Cut <p>45 mins</p> 
              </label>
            </li>
            <li>
              <label>
                <input type="radio" name="service" value="Bespoke Cut" />
                Bespoke Cut
              </label>
            </li>
            <li>
              <label>
                <input type="radio" name="service" value="Colour" />
                Colour
              </label>
            </li>
            <li>
              <label>
                <input type="radio" name="service" value="Treatment" />
                Treatment
              </label>
            </li>
          </ul>
          
        </form>
      </div>

        </div>
   
  );
}

export default Booking;