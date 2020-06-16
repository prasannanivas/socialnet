import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import "./PlaceItem.css";
import Map from "../../places/components/Map";
import Editform from "./Editform";
import logo from "../../deleting-logo.gif";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../shared/context/auth-context";

import { useAuth } from "../../shared/hooks/auth-hook";

export default function Placeitem(props) {
  const { userId } = useContext(AuthContext);
  const routeUserId = useParams().userId;
  const { token } = useAuth();
  const history = useHistory();
  const [modalopen, setmodalopen] = useState(false);
  const [deletemodalopen, setdeletemodalopen] = useState(false);
  const [editmodalopen, seteditmodalopen] = useState(false);
  const [loading, setLoading] = useState(false);

  const deletePostHandler = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/places/${props.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      window.location.reload();
      //history.push(`/${props.creatorId}/places/`);
    } catch (error) {
      console.log(error.message);
    }
    setdeletemodalopen(false);
    setLoading(false);
  };

  return (
    <div>
      {editmodalopen && (
        <Editform
          id={props.id}
          title={props.title}
          description={props.description}
          address={props.address}
          cancelHandler={() => seteditmodalopen(false)}
        />
      )}
      {!editmodalopen && (
        <div>
          {loading ? (
            <img className="delete-logo" src={logo} />
          ) : (
            <div>
              <div className={modalopen ? "modalOverlay" : "hidebutton"}>
                <Map className="map" center={props.coordinates} zoom={16} />
              </div>

              <div className={deletemodalopen ? "delete-modal" : null}>
                <div className={!deletemodalopen ? "hidebutton" : null}>
                  <p>Are you sure , you want to delete this item?</p>
                  <button
                    className="edit-button"
                    onClick={() => setdeletemodalopen(false)}
                  >
                    Cancel
                  </button>
                  <button className="delete-button" onClick={deletePostHandler}>
                    Delete
                  </button>
                </div>
              </div>
              <div className="placeitem">
                <div className="card-for-placeitem">
                  <img
                    src={`${process.env.REACT_APP_BACKEND_URL}/${props.image}`}
                    alt={props.title}
                  />
                  <h1>{props.title}</h1>
                  <p>{props.address}</p>
                  <p>{props.description}</p>
                  {userId === routeUserId && (
                    <button
                      className={`edit-button ${
                        deletemodalopen || modalopen ? "hidebutton" : null
                      }`}
                      onClick={() => seteditmodalopen(true)}
                    >
                      Edit <i class="fa fa-pencil" aria-hidden="true"></i>
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setmodalopen(!modalopen);
                    }}
                  >
                    {!modalopen ? (
                      <i class="fa fa-map-marker" aria-hidden="true"></i>
                    ) : (
                      "close"
                    )}
                  </button>
                  {userId === routeUserId && (
                    <button
                      className={`delete-button ${
                        deletemodalopen || modalopen ? "hidebutton" : null
                      }`}
                      onClick={() => {
                        setmodalopen(false);
                        setdeletemodalopen(!deletemodalopen);
                      }}
                    >
                      Delete <i class="fa fa-trash" aria-hidden="true"></i>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
