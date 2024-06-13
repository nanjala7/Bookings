import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";
//import { Link, NavLink } from "react-router-dom";

export const Card = ({
  imgSrc,
  imgAlt,
  title,
  description,
 logoSrc,
 logoAlt,
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
//{logoSrc && logoAlt&&(<img src={logoSrc} alt={logoAlt} className="card-logo" />) }
