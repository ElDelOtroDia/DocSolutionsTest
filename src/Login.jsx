export default function Login({
  handleLogin,
  handleInput,
  username,
  password,
}) {
  return (
    <div className="login">
      <h1>Inicio de sesión</h1>
      <div className="input-container">
        <label>Usuario:</label>
        <input
          type="text"
          className="input-login"
          value={username}
          onChange={(e) => handleInput("username", e.target.value)}
        />
      </div>
      <div className="input-container">
        <label>Password:</label>
        <input
          type="password"
          className="input-login"
          value={password}
          onChange={(e) => handleInput("password", e.target.value)}
        />
      </div>
      <button className="btn-ok" type="button" onClick={handleLogin}>
        OK
      </button>
    </div>
  );
}
