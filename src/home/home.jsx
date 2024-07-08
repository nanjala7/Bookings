// src/Home.jsx
import React, { useState, useEffect } from 'react';
import { Card } from '../component/Card';
import axios from 'axios';
import './Home.css';

const locations = [
  {
    imgSrc: "https://www.miosalon.com/couponimages/2024/01/23/09dc4c71ca6b8000cbc74d886edc7028.jpg",
    imgAlt: "Mancave NSK",
    title: "Mancave NSK",
    description: "Nairobi Street Kitchen, Westlands",
    link: "/booking",
    lat: -1.271028,
    lon: 36.807439
  },
  {
    imgSrc: "https://www.miosalon.com/couponimages/2024/01/23/d49ace252b308b85f18eb251a7119c72.jpg",
    imgAlt: "Mancave Kitengela",
    title: "Mancave Kitengela",
    description: "Danka Plaza, Kitengela",
    link: "/booking",
    lat: -1.465306,
    lon: 36.956218
  }
];

function Home() {
  const [userLocation, setUserLocation] = useState(null);
  const [nearestLocation, setNearestLocation] = useState(null);
  const [sortedLocations, setSortedLocations] = useState([]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const userLoc = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setUserLocation(userLoc);

          // Fetch real-time travel data
          const locationsWithRealTimeData = await Promise.all(locations.map(async location => {
            try {
              const distanceMatrixResponse = await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json', {
                params: {
                  origins: `${userLoc.latitude},${userLoc.longitude}`,
                  destinations: `${location.lat},${location.lon}`,
                  key: 'AIzaSyCy5GovA803gr57jPSKSc-xbCehnhttMks',
                  mode: 'driving'
                }
              });

              const data = distanceMatrixResponse.data;
              if (data.rows[0].elements[0].status === "OK") {
                const distance = data.rows[0].elements[0].distance.text;
                const travelTime = data.rows[0].elements[0].duration.text;
                return {
                  ...location,
                  distance,
                  travelTime,
                  googleMapsLink: `https://www.google.com/maps?q=${location.lat},${location.lon}`
                };
              } else {
                return {
                  ...location,
                  distance: "N/A",
                  travelTime: "N/A",
                  googleMapsLink: `https://www.google.com/maps?q=${location.lat},${location.lon}`
                };
              }
            } catch (error) {
              console.error("Error fetching data from Google Maps API:", error);
              return {
                ...location,
                distance: "Error",
                travelTime: "Error",
                googleMapsLink: `https://www.google.com/maps?q=${location.lat},${location.lon}`
              };
            }
          }));

          // Sort locations by distance
          locationsWithRealTimeData.sort((a, b) => {
            if (a.distance === "N/A" || a.distance === "Error") return 1;
            if (b.distance === "N/A" || b.distance === "Error") return -1;
            return parseFloat(a.distance) - parseFloat(b.distance);
          });

          setSortedLocations(locationsWithRealTimeData);
          setNearestLocation(locationsWithRealTimeData[0]);
        },
        (error) => {
          console.error("Error getting user location:", error.message);
        }
      );
    } else {
      console.error("Geolocation not supported");
    }
  }, []);

  return (
    <div className="home-container">
      <h1 className="title">Choose a Location</h1>
      {sortedLocations.length > 0 && (
        <p>Locations are arranged from nearest to farthest from your current location.</p>
      )}
      <div className="cards-container">
        {sortedLocations.map((location, index) => (
          <div className="col" key={index}>
            <div className={`card ${nearestLocation && nearestLocation.title === location.title ? 'nearest-card' : ''}`}>
              <Card
                imgSrc={location.imgSrc}
                imgAlt={location.imgAlt}
                title={location.title}
                description={location.description}
                buttonText="Book Now"
                link={location.link}
                distance={location.distance}
                travelTime={location.travelTime}
              
                googleMapsLink={location.googleMapsLink}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
