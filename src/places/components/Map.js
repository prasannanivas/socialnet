import React, { useRef, useEffect , useState} from "react";

import "./Map.css";

const Map = props => {
  const mapRef = useRef();
  let map;
  const [networkError , isNetworkError] = useState(false);
  const { center, zoom } = props; 

  useEffect(() => {
    try {
      map = new window.google.maps.Map(mapRef.current, {
        center: {
          lat: Number(center.lat),
          lng: Number(center.lng)
        },
        zoom: zoom
      });
    } catch (error) {
      isNetworkError(true);
      return;
    }
    
  
    new window.google.maps.Marker({ position:{
      lat: Number(center.lat),
      lng: Number(center.lng)
    }, map: map });
  }, [center, zoom]);
  if(networkError){
    return(
      <div>
        Oops! check you connection!!!!!
      </div>
    );
  }

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  );
};

export default Map;