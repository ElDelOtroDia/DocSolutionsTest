import { useEffect, useState } from "react";
import NewUser from "./NewUser";

export default function FormResults({ token }) {
  const [searchText, setSearchText] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  const [formResults, setFormResults] = useState([]);

  useEffect(
    function () {
      async function getFormResults() {
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

          setFormResults(data.Body || []);
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
    setSearchText("");
    setIsNewUser((curr) => !curr);
  }

  return (
    <>
      {isNewUser ? (
        <NewUser handleNewUser={handleNewUser} token={token} />
      ) : (
        <section className="form-results">
          <div className="top-table">
            <div>
              <input
                type="text"
                placeholder="Buscar"
                value={searchText}
                onChange={(e) => handleSearchText(e.target.value)}
                className="input-form-results"
              />
            </div>
            <div>
              <button
                type="button"
                className="btn-new-user"
                onClick={(e) => handleNewUser(e)}
              >
                Nuevo
              </button>
            </div>
          </div>
          <div>
            {formResults.length === 0 ? (
              <p className="no-results">No hay resultados. Escriba para iniciar una búsqueda.</p>
            ) : (
              <table className="table-results">
                <tr>
                  <th className="table-results-header">Username</th>
                  <th className="table-results-header">Name</th>
                  <th className="table-results-header">FatherLastName</th>
                  <th className="table-results-header">CreationDate</th>
                  <th className="table-results-header">Email</th>
                  <th className="table-results-header">PhoneNumber</th>
                </tr>

                {formResults?.map((user) => (
                  <tr key={user.Id} className="table-results-rows">
                    <td className="table-results-cell">{user.Username}</td>
                    <td className="table-results-cell">{user.Name}</td>
                    <td className="table-results-cell">
                      {user.FatherLastName}
                    </td>
                    <td className="table-results-cell">{user.CreationDate}</td>
                    <td className="table-results-cell">{user.Email}</td>
                    <td className="table-results-cell">{user.PhoneNumber}</td>
                  </tr>
                ))}
              </table>
            )}
          </div>
        </section>
      )}
    </>
  );
}
