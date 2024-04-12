// import './App.css';
// const USERNAME = "usr_prueba1";
// const PASSWORD = "Nuevo1234";

import { useState } from "react";
import Login from "./Login";
import FormResults from "./FormResults";
import "./App.css";

function App() {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Body: {
          Username: username,
          Password: password,
        },
      }),
    };

    fetchToken(requestOptions);
  }

  async function fetchToken(requestOptions) {
    try {
      const res = await fetch(
        "https://techhub.docsolutions.com/OnBoardingPre/WebApi/api/authentication/authentication",
        requestOptions
      );
      const data = await res.json();

      if (data.IsOK !== true)
        return alert(
          "Sus datos son incorrectos, verifique su información e intente nuevamente"
        );
      setToken(data.Body.Token);
    } catch (err) {
      console.log(err);
    }
  }

  function handleInput(field, value) {
    if (field === "username") setUsername(value);
    if (field === "password") setPassword(value);
  }

  return (
    <div className="App">
      {token ? (
        <FormResults token={token} />
      ) : (
        <Login
          handleLogin={handleLogin}
          handleInput={handleInput}
          username={username}
          password={password}
        />
      )}
    </div>
  );
}

export default App;
