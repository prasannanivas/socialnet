import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Placelist from "../components/PlaceList";
import logo from "../../loading-logo.gif";
import "./UserPlaces.css";

export default function UserPlaces(props) {
  const userId = useParams().userId;
  const [loading, setIsLoading] = useState(false);
  const [loadedPlaces, setLoadedPlaces] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/places/users/${userId}`
        );
        const responseData = await response.json();

        setLoadedPlaces(responseData.places);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
      }
    };
    sendRequest();
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      {loadedPlaces ? (
        <Placelist items={loadedPlaces} />
      ) : !loading ? (
        <div className="no-place-found">
          <img
            className="oops-image"
            src="https://cdn.dribbble.com/users/88213/screenshots/8560585/media/7263b7aaa8077a322b0f12a7cd7c7404.png"
          />
          <p>this user does not have places</p>
        </div>
      ) : (
        <img src={logo} />
      )}
    </div>
  );
}
