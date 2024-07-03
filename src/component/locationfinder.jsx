// src/LocationFinder.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LocationFinder.css'

const LocationFinder = () => {
  const [location, setLocation] = useState(null);
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setLocation(loc);
          fetchPlaces(loc);
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError("Geolocation not supported");
    }
  }, []);

  const fetchPlaces = async (loc) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${loc.latitude},${loc.longitude}&radius=1500&type=restaurant&key=YOUR_API_KEY`
      );
      setPlaces(response.data.results);
    } catch (error) {
      setError("Failed to fetch places");
    }
  };

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!location) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="location-finder">
      <h2>Nearby Places</h2>
      <ul>
        {places.map((place) => (
          <li key={place.id}>{place.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default LocationFinder;
