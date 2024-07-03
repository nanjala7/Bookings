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
}) => {
  return (
    <div className="card-container">
      {imgSrc && imgAlt && (
        <img src={imgSrc} alt={imgAlt} className="card-img" />
      )}
      {title && <h1 className="card-title">{title}</h1>}
      {description && <p className="card-description">{description}</p>}
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
};