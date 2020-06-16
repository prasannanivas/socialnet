import React, { useState, useEffect } from "react";
import {useHistory} from 'react-router-dom';
import { useAuth } from '../../shared/hooks/auth-hook';
import logo from '../../loading-logo.gif';

import "./NewPlace.css";

export default function NewPlace() {
  const { token } = useAuth();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isLoading , setIsLoading] = useState(false);

  const pickHandler = (evt) => {
    if (evt.target.files && evt.target.files.length === 1) {
      console.log("inside pick handler");
      const pickedFile = evt.target.files[0];
      setFile(pickedFile);
    }
  };
  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const submitHandler = async (evt) => {
    evt.preventDefault();
    setIsLoading(true);
    try {
      const formdata = new FormData();
      formdata.append("title", title);
      formdata.append("description", description );
      formdata.append("address", address);
      formdata.append("image", file);

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/places`, {
        method: "POST",
        headers : {
          Authorization :`Bearer ${token}`,
        },
        body:formdata,
      },
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      console.log("from newplaces", responseData);
      history.push(`/${responseData.place.creator}/places`);
    } catch (error) {
      setError(error.message);
      history.push('/');
    }
    setIsLoading(false);
  };
  return (
    <form className="form" onSubmit={submitHandler}>
      {isLoading ? <img src = {logo}/>  :
      <div>
        {previewUrl && <img className = "preview-image" src={previewUrl} />}
      <input
        className="form-input"
        placeholder="title"
        label="title"
        value={title}
        onChange={(evt) => setTitle(evt.target.value)}
      />
      <textarea
        className="form-input-textarea"
        placeholder="Description"
        value={description}
        onChange={(evt) => setDescription(evt.target.value)}
      />
      <input
        className="form-input"
        placeholder="address"
        label="address"
        value={address}
        onChange={(evt) => setAddress(evt.target.value)}
      />
      <input
        className="form-input"
        type="file"
        accept=".jpg, .png, .jpeg"
        onChange={pickHandler}
      />
      <input className="form-button" type="submit" />
      </div>}
    </form>
  );
}
