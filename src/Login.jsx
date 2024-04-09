export default function Login({handleLogin, handleInput, username, password}) {
  return (
    <div className="login">
      <h1>Inicio de sesión</h1>
      <div>
        <label>Usuario:</label>
        <input
          type="text"
          className="text"
          value={username}
          onChange={(e) => handleInput("username", e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          className="text"
          value={password}
          onChange={(e) => handleInput("password", e.target.value)}
        />
      </div>
      <button type="button" onClick={handleLogin}>
        OK
      </button>
    </div>
  );
}
