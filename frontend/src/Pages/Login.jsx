import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk, FacebookLoginThunk } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import FacebookLogin from "react-facebook-login";

export default function Signup() {
  const [credential, setCredential] = useState({
    username: "",
    password: "",
  });

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    isAuthenticated && navigate("/");
  }, [isAuthenticated, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredential((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const responseFacebook = (userInfo) => {
    console.log("facebook response", userInfo);
    dispatch(FacebookLoginThunk(userInfo));
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="username"
        name="username"
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="password"
        name="password"
        onChange={handleChange}
      />
      <button
        onClick={() =>
          dispatch(loginThunk(credential)).then(() => navigate("/"))
        }
      >
        Login
      </button>
      <FacebookLogin
        appId={process.env.REACT_APP_FACEBOOK_ID}
        autoLoad={false}
        fields="name,email"
        callback={responseFacebook}
      />
    </div>
  );
}
