import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { dataContext } from "../../App";

const PatientLogin = () => {
  const data = useContext(dataContext);
  const dispatch = data.dispatch;
  const history = useHistory();
  const [errorMessage, setMessage] = useState("Please enter your details");
  const handleUserLogin = (event) => {
    event.preventDefault();
    const userEmail = event.target.email.value;
    const userPassword = event.target.password.value;

    const sendData = async () => {
      // Please change the localhose number according to your server port number
      const response = await fetch("http://localhost:3333/api/session/new", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
          password: userPassword,
          email: userEmail,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (response.status === 400) {
        const data = await response.json();
        console.log("data", data.error);
        setMessage(data.error);
      } else if (response.status === 200) {
        const data = await response.json();
        dispatch({ type: "PUSHPATIENTID", payload: data._id });
        history.push("/home");
      }
    };
    sendData();
  };
  return (
    <div>
      <form onSubmit={handleUserLogin}>
        <label>Email:</label>
        <br />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email address"
          required
        />
        <br />
        <br />
        <label>Password:</label>
        <br />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter password"
          required
        />
        <br />
        <br />
        <input type="submit" value="Enter" />
      </form>
      <div>{errorMessage}</div>
    </div>
  );
};

export default PatientLogin;
