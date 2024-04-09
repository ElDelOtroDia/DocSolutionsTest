import { useState } from "react";

const defaultValues = {
  Tenant: null,
  UserName: "",
  Password: "",
  Name: "",
  FatherLastName: "",
  MotherLastName: "",
  Email: "",
  PhoneNumber: "",
  Metadata: null,
  Roles: [
    {
      Id: 2,
      Name: "Usuario Tradicional",
    },
  ],
};

export default function NewUser({ handleNewUser, token }) {
  const [newUserData, setNewUserData] = useState(defaultValues);
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleInput(field, value) {
    setNewUserData((currentData) => {
      return { ...currentData, [field]: value };
    });
  }

  function handleConfirmPassword(value) {
    setConfirmPassword(value);
  }

  function handleSaveUser(e) {
    if (newUserData.Password !== confirmPassword) {
      alert("Confirme su contraseña");
      return;
    }
    // Should save and send the new user info
    async function submitUser() {
      console.log(token);
      try {
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            Body: {
              ...newUserData,
            },
          }),
        };

        const res = await fetch(
          "https://techhub.docsolutions.com/OnBoardingPre/WebApi/api/user/RegisterUserRole",
          requestOptions
        );
        const data = await res.json();

        if (!data.IsOK) {
          alert("Por favor revise su información");
          return;
        }

        setNewUserData(defaultValues);
        handleNewUser(e);
      } catch (err) {
        console.log(err);
      }
    }
    submitUser();
  }

  return (
    <div>
      <h1>Nuevo usuario</h1>
      <div>
        <label>Nombre</label>
        <input
          type="text"
          value={newUserData.Name}
          onChange={(e) => handleInput("Name", e.target.value)}
        />
      </div>
      <div>
        <label>Apellido P.</label>
        <input
          type="text"
          value={newUserData.FatherLastName}
          onChange={(e) => handleInput("FatherLastName", e.target.value)}
        />
      </div>
      <div>
        <label>Apellido M</label>
        <input
          type="text"
          value={newUserData.MotherLastName}
          onChange={(e) => handleInput("MotherLastName", e.target.value)}
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="text"
          value={newUserData.Email}
          onChange={(e) => handleInput("Email", e.target.value)}
        />
      </div>
      <div>
        <label>Telefono</label>
        <input
          type="number"
          value={newUserData.PhoneNumber}
          onChange={(e) => handleInput("PhoneNumber", e.target.value)}
        />
      </div>
      <div>
        <label>Usuario</label>
        <input
          type="text"
          value={newUserData.UserName}
          onChange={(e) => handleInput("UserName", e.target.value)}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={newUserData.Password}
          onChange={(e) => handleInput("Password", e.target.value)}
        />
      </div>
      <div>
        <label>Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => handleConfirmPassword(e.target.value)}
        />
      </div>
      <button type="button" onClick={(e) => handleSaveUser(e)}>
        Guardar
      </button>
      <button type="button" onClick={handleNewUser}>
        Cancelar
      </button>
    </div>
  );
}
