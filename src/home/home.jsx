// src/Home.js
import React, { useState, useEffect } from 'react';
import { Card } from '../component/Card';
import axios from 'axios';
import { getDistanceFromLatLonInKm } from '../distance';
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
        (position) => {
          const userLoc = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setUserLocation(userLoc);

          // Calculate distances and sort locations by distance
          const distances = locations.map(location => {
            return {
              ...location,
              distance: getDistanceFromLatLonInKm(
                userLoc.latitude,
                userLoc.longitude,
                location.lat,
                location.lon
              )
            };
          });

          distances.sort((a, b) => a.distance - b.distance);
          setSortedLocations(distances);
          setNearestLocation(distances[0]);
        },
        (error) => {
          console.error(error.message);
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
            <div className={`card-container ${nearestLocation && nearestLocation.title === location.title ? 'nearest-card' : ''}`}>
              <Card
                imgSrc={location.imgSrc}
                imgAlt={location.imgAlt}
                title={location.title}
                description={location.description}
                buttonText="Book Now"
                link={location.link}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
