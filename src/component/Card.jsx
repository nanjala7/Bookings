import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import "./Card.css";
import LocationFinder from "./locationfinder"


export const Card = ({
  imgSrc,
  imgAlt,
  title,
  description,
  buttonText,
  link,
  distance, travelTime,googleMapsLink 
}) => {
  
  return (
    <div className="card">
      {imgSrc && imgAlt && (
        <img src={imgSrc} alt={imgAlt} className="card-img" />
      )}
      {title && <h1 className="card-title">{title}</h1>}
     
      <p className="card-description">
          <a href={googleMapsLink} target="_blank" rel="noopener noreferrer">{description}</a>
        </p>
      <p className="card-distance">Distance: {distance} km</p>
      <p className="card-time">Time: {travelTime} minutes</p>
      {buttonText && link && (
        <Link to={link} className="card-btn">
          {buttonText}
        </Link>
      )}
     
    </div>
  );
};

Card.propTypes = {
  imgSrc: PropTypes.string,
  imgAlt: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  buttonText: PropTypes.string,
  link: PropTypes.string,
  distance: PropTypes.string.isRequired,
  travelTime: PropTypes.string.isRequired,
  googleMapsLink: PropTypes.string.isRequired,
};