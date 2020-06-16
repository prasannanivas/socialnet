import React from "react";

import Card from "./Card";

export default function Userslist(props) {
  return (
    <div>
      {props.items.map((user) => (
        <Card
          id={user._id}
          key={user._id}
          name={user.name}
          placesCount={user.places.length}
          image={user.image}
        />
      ))}
    </div>
  );
}
