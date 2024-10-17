// src/home/Home.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '../components/Card'; // Updated import to use relative path
import axios from 'axios';
import pLimit from 'p-limit'; // Import p-limit to control concurrent API requests
import './Home.css';

function Home() {
  const { network_slug } = useParams();
  const [userLocation, setUserLocation] = useState(null);
  const [locations, setLocations] = useState([]);
  const [sortedLocations, setSortedLocations] = useState([]);
  const [nearestLocation, setNearestLocation] = useState(null);

  useEffect(() => {
    // Fetch locations based on network slug
    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          `https://proartist-f6c2dfe5c27a.herokuapp.com/booking/${network_slug}/locations/`
        );
        setLocations(response.data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, [network_slug]);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const userLoc = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setUserLocation(userLoc);

          // Set a limit for concurrent requests to avoid API rate limiting issues
          const limit = pLimit(5); // Limit to 5 concurrent requests

          // Calculate distance and travel time for each location
          const locationsWithRealTimeData = await Promise.all(
            locations.map((location) =>
              limit(async () => {
                if (!location.latitude || !location.longitude) {
                  console.warn(
                    `Location ${location.name} is missing coordinates`
                  );
                  return {
                    ...location,
                    distance: 'Coordinates not available',
                    travelTime: 'Coordinates not available',
                  };
                }

                try {
                  const distanceMatrixResponse = await axios.get(
                    `https://proartist-f6c2dfe5c27a.herokuapp.com/booking/distance-time/${network_slug}/`,
                    {
                      params: {
                        latitude: userLoc.latitude,
                        longitude: userLoc.longitude,
                        destination_latitude: location.latitude,
                        destination_longitude: location.longitude,
                        departure_time: 'now', // Add real-time traffic data
                      },
                    }
                  );

                  const data = distanceMatrixResponse.data;
                  return {
                    ...location,
                    distance: data.distance || 'N/A',
                    travelTime: data.duration || 'N/A',
                  };
                } catch (error) {
                  console.error('Error fetching distance data:', error);
                  return {
                    ...location,
                    distance: 'Error',
                    travelTime: 'Error',
                  };
                }
              })
            )
          );

          // Sort locations based on distance
          const parseDistance = (distanceStr) => {
            if (distanceStr.includes('km')) {
              return parseFloat(distanceStr.replace(/[^0-9.]/g, ''));
            } else if (distanceStr.includes('m')) {
              const meters = parseFloat(distanceStr.replace(/[^0-9.]/g, ''));
              return meters / 1000; // Convert to kilometers
            } else {
              return NaN;
            }
          };

          locationsWithRealTimeData.sort((a, b) => {
            const distanceA = parseDistance(a.distance);
            const distanceB = parseDistance(b.distance);

            if (isNaN(distanceA)) return 1;
            if (isNaN(distanceB)) return -1;
            return distanceA - distanceB;
          });

          setSortedLocations(locationsWithRealTimeData);
          setNearestLocation(locationsWithRealTimeData[0]);
        },
        (error) => {
          console.error('Error getting user location:', error.message);
        },
        {
          enableHighAccuracy: true, // Use high accuracy for better results
          timeout: 10000, // Set a reasonable timeout
          maximumAge: 60000, // Accept a cached position up to 1 minute old
        }
      );
    } else {
      console.error('Geolocation not supported');
    }
  }, [locations, network_slug]);

  return (
    <div className="home-container">
      <h1 className="title">Choose a Location</h1>
      {sortedLocations.length > 0 && (
        <div>
          <p>
            <strong>Locations are sorted from nearest to farthest based on your current location.</strong>
          </p>
          <p>Click on the location name to get directions on Google Maps.</p>
        </div>
      )}
      <div className="cards-container">
        {sortedLocations.length > 0 ? (
          sortedLocations.map((location, index) => {
            const googleMapsLink =
              location.latitude && location.longitude
                ? `https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`
                : null;

            return (
              <div className="col" key={index}>
                <div
                  className={`card ${
                    nearestLocation &&
                    nearestLocation.name === location.name
                      ? 'nearest-card'
                      : ''
                  }`}
                >
                  <Card
                    imgSrc={location.image || null}
                    imgAlt={location.name}
                    title={location.name}
                    description={location.address}
                    buttonText="Book Now"
                    link={`/booking/${network_slug}/locations/${location.id}/services/`}
                    distance={
                      userLocation
                        ? location.distance
                        : 'Distance not available'
                    }
                    travelTime={
                      userLocation
                        ? location.travelTime
                        : 'Travel time not available'
                    }
                    showMap={
                      nearestLocation &&
                      nearestLocation.name === location.name
                    }
                    googleMapsLink={googleMapsLink}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <p>Loading locations...</p>
        )}
      </div>
    </div>
  );
}

export default Home;
