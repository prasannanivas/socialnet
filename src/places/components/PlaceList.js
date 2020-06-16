import React from "react";

import PlaceItem from "./PlaceItem";

import './PlaceList.css';

export default function PlaceList(props) 
{
  return (
    <div>
      {props.items.map((place) => (
        <PlaceItem
          key={place._id}
          id={place._id}
          image={place.image}
          title={place.title}
          address={place.address}
          description={place.description}
          creatorId={place.creator}
          coordinates={place.location}
        />
      ))}
    </div>
  );
}
