import React , {useState} from "react";
//import {useHistory} from 'react-router-dom';
import logo from '../../edit-logo.gif';
import './Editform.css';
import { useAuth } from '../../shared/hooks/auth-hook';


function Editform(props) {
  const { token , userId} = useAuth();
  //const history = useHistory();
    const [title , setTitle] = useState(props.title);
    const [address , setAddress] = useState(props.address);
    const [description , setDescription] = useState(props.description);
    const [loading, setLoading] = useState(false);
    const updatePlace = async(evt) => {
        evt.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/places/${props.id}`,{
                method:'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    Authorization :`Bearer ${token}`,
                  },
                  body: JSON.stringify({
                    title,
                    description,
                    address,
                  })
            });

            console.log(response);
            window.location.reload();
        } catch (error) {
            console.log(error.message)
        }

        setLoading(false);
       // history.push(`/${userId}/places`);

    }



  return (
    <div>
      {loading && <img style = {{marginTop : '20vh'}} src = {logo} />}
      {!loading && 
      <form className="form-edit" onSubmit = {updatePlace} >
        <h5 className = 'form-label'>Title</h5>
        <input
          className="form-input-edit"
          placeholder="title"
          label="title"
          value={title}
          onChange={(evt) => setTitle(evt.target.value)}
        />
        <h5 className = 'form-label'>Description</h5>
        <textarea
          className="form-input-textarea-edit"
          placeholder="Description"
          value={description}
          onChange={(evt) => setDescription(evt.target.value)}
        />
        <h5 className = 'form-label'>Address</h5>
        <input
          className="form-input-edit"
          placeholder="address"
          label="address"
          value={address}
          onChange={(evt) => setAddress(evt.target.value)}
        />
        <button className="cancel-button" onClick = {props.cancelHandler}>Cancel</button>
        <button className="update-button" type="submit">Update</button>
        

      </form>}
    </div>
  );
}

export default Editform;
