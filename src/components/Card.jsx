import React from 'react';
import PropTypes from 'prop-types';
import { Building } from 'lucide-react'; // Import the building icon from Lucide Icons
import './Card.css';

export function Card({
  imgSrc = null,
  imgAlt = '',
  title,
  description = '',
  buttonText = 'Learn More',
  link,
  distance = '',
  travelTime = '',
  showMap = false,
  googleMapsLink = null,
}) {
  return (
    <div className="card">
      {imgSrc ? (
        <img src={imgSrc} alt={imgAlt} className="card-image" />
      ) : (
        <div className="placeholder-icon">
          <Building size={100} color="#ccc" aria-label="Building Icon" />
        </div>
      )}
      <div className="card-content">
        <h2 className="card-title">
          {googleMapsLink ? (
            <a href={googleMapsLink} target="_blank" rel="noopener noreferrer">
              {title}
            </a>
          ) : (
            title
          )}
        </h2>
        <p className="card-description">{description}</p>
        {distance && <p className="card-distance">Distance: {distance}</p>}
        {travelTime && <p className="card-time">Travel Time: {travelTime}</p>}
        <div className="card-button-container">
          <a href={link} className="card-btn">
            {buttonText}
          </a>
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  imgSrc: PropTypes.string,
  imgAlt: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  buttonText: PropTypes.string,
  link: PropTypes.string.isRequired,
  distance: PropTypes.string,
  travelTime: PropTypes.string,
  showMap: PropTypes.bool,
  googleMapsLink: PropTypes.string,
};

export default Card;