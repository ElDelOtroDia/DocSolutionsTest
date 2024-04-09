import { useEffect, useState } from "react";
import NewUser from "./NewUser";

export default function FormResults({ token }) {
  const [searchText, setSearchText] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  const [formResults, setFormResults] = useState([]);

  useEffect(
    function () {
      async function getFormResults() {
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
                SearchText: searchText,
              },
            }),
          };

          const res = await fetch(
            "https://techhub.docsolutions.com/OnBoardingPre/WebApi/api/user/GetUsers",
            requestOptions
          );
          const data = await res.json();

          setFormResults(data.Body);

          console.log(data);
        } catch (err) {
          console.log(err);
        }
      }
      getFormResults();
    },
    [token, searchText]
  );

  function handleSearchText(value) {
    setSearchText(value);
  }

  function handleNewUser(e) {
    e.preventDefault();
    setSearchText("")
    setIsNewUser((curr) => !curr);
  }

  return (
    <>
      {isNewUser ? (
        <NewUser handleNewUser={handleNewUser} token={token}/>
      ) : (
        <section>
          <div className="top-table">
            <div>
              <input
                type="text"
                placeholder="Buscar"
                value={searchText}
                onChange={(e) => handleSearchText(e.target.value)}
              />
              <button type="button">OK</button>
            </div>
            <div>
              <button type="button" onClick={(e) => handleNewUser(e)}>
                Nuevo
              </button>
            </div>
          </div>
          <div>
            <table>
              <tr>
                <th>Username</th>
                <th>Name</th>
                <th>FatherLastName</th>
                <th>CreationDate</th>
                <th>Email</th>
                <th>PhoneNumber</th>
              </tr>

             {formResults?.length === 0
                ? "No hay resultados"
                : formResults?.map((user) => (
                    <tr key={user.Id}>
                      <td>{user.Username}</td>
                      <td>{user.Name}</td>
                      <td>{user.FatherLastName}</td>
                      <td>{user.CreationDate}</td>
                      <td>{user.Email}</td>
                      <td>{user.PhoneNumber}</td>
                    </tr>
                  ))}
            </table>
          </div>
        </section>
      )}
    </>
  );
}
