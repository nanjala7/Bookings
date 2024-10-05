// src/context/ServicesContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const ServicesContext = createContext();

export const ServicesProvider = ({ children, network_slug, location_id }) => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          `https://proartist-f6c2dfe5c27a.herokuapp.com/booking/${network_slug}/locations/${location_id}/services/`
        );
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, [network_slug, location_id]);

  return (
    <ServicesContext.Provider value={services}>
      {children}
    </ServicesContext.Provider>
  );
};

export default ServicesContext;