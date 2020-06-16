import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import logo from "../../signingin-logo.gif";
import { AuthContext } from "../../shared/context/auth-context";
import "./Login.css";
export default function Login(props) {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, isloading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);

  const submithandler = async (evt) => {
    evt.preventDefault();
    isloading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const responseData = await response.json();
      const { userId, token } = responseData;

      if (!response.ok) {
        throw new Error(responseData.message);
      }
      const uid = userId;
      console.log("from login", responseData);
      login(uid, token);
      history.push(`/${responseData.userId}/places`);
    } catch (error) {
      console.log("error from login", error);
      setError(error.message);
    }
    isloading(false);
  };
  return (
    <form className="login" onSubmit={submithandler}>
      {loading ? (
        <img src={logo} />
      ) : (
        <div>
          <input
            placeholder="Email"
            onChange={(evt) => setEmail(evt.target.value)}
          />
          <input
            placeholder="Password"
            type="password"
            onChange={(evt) => setPassword(evt.target.value)}
          />
          <div style={{ color: "white", background: "red" }}>{error}</div>
          <button>Submit</button>
        </div>
      )}
    </form>
  );
}
