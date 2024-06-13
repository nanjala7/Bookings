import { Card } from '../component/Card';

function Home() {
  return (
    <div className="Title">Choose a Location
      <div className="App">
        <div className="col">
          <Card
            imgSrc="https://www.miosalon.com/couponimages/2024/01/23/09dc4c71ca6b8000cbc74d886edc7028.jpg"
            imgAlt="Card Image 3"
            title="Mancave NSK"
            description="Nairobi Street Kitchen, Westlands"
            buttonText="Book Now"
            link="/booking" // Changed to navigate to the Booking page
          />
        </div>
        <div className="col">
          <Card
            imgSrc="https://www.miosalon.com/couponimages/2024/01/23/d49ace252b308b85f18eb251a7119c72.jpg"
            imgAlt="Card Image 3"
            title="Mancave Kitengela"
            description="Danka Plaza, Kitengela"
            buttonText="Book Now"
            link="/booking" // Changed to navigate to the Booking page
          />
        </div>
      </div>
    </div>
  );
}

export default Home;