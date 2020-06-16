import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import logo from "../../signingin-logo.gif";
import { AuthContext } from "../../shared/context/auth-context";

export default function Signup(props) {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, isloading] = useState(false);
  const [error, setError] = useState("");
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const { login } = useContext(AuthContext);

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
    isloading(true);
    try {
      const formdata = new FormData();
      formdata.append("email", email);
      formdata.append("name", name);
      formdata.append("password", password);
      formdata.append("image", file);

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/signup`, {
        method: "POST",
        body: formdata,
      });

      const responseData = await response.json();
      const { userId, token } = responseData;

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      console.log("from signup", responseData);
      //history.push(`/${responseData.user.id}/places`);
      login(userId, token);
      history.push("/");
    } catch (error) {
      isloading(false);
      console.log("error from signup", error);
      setError(error.message);
    }
    isloading(false);
  };

  return (
    <form className="login" onSubmit={submitHandler}>
      {loading ? (
        <img className="signin-loader" src={logo} />
      ) : (
        <div>
          <input
            placeholder="Name"
            value={name}
            required
            onChange={(evt) => setName(evt.target.value)}
          />
          <input
            placeholder="Email"
            type="email"
            value={email}
            required
            onChange={(evt) => setEmail(evt.target.value)}
          />
          <input
            placeholder="Password"
            type="password"
            onChange={(evt) => setPassword(evt.target.value)}
          />
          <input
            className="form-input"
            type="file"
            accept=".jpg, .png, .jpeg"
            onChange={pickHandler}
          />
          <div style={{ color: "white", background: "red" }}>{error}</div>
          <button>Submit</button>
        </div>
      )}
    </form>
  );
}
