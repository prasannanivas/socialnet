import React from "react";
import { NavLink } from "react-router-dom";
import "./Card.css";

export default function Card(props) {
  return (
    <div>
    <NavLink to={`/${props.id}/places`} className = '.NavLink'>
      <div className="card">
        <img className="rounded-image" src={`${process.env.REACT_APP_BACKEND_URL}/${props.image}`} alt={props.name} />
        <div className="card-details">
          <h4>name : {props.name}</h4>
          <h4>Places : {props.placesCount}</h4>
        </div>
      </div>
    </NavLink>
    </div>
  );
}
