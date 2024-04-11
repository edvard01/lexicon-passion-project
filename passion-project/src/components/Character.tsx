import { useState, FormEvent } from "react";
import "../css/character.css";

export function Character(): JSX.Element {
  const [region, setRegion] = useState<string>("eu");
  const [server, setServer] = useState<string>("");
  const [charName, setCharName] = useState<string>("");
  const [response, setResponse] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchCharData();
  };

  function fetchCharData() {
    fetch(`https://raider.io/api/v1/characters/profile?region=${region}&realm=${server}&name=${charName}`)
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setResponse(data);
      });
  }

  return (
    <>
      <div className="page">
        <div className="content">
          <div>
            <form onSubmit={handleSubmit}>
              <span>
                <label>Realm:</label>
                <select name="realm">
                  <option value="EU" onChange={() => setRegion("eu")}>
                    Europe
                  </option>
                  <option value="NA" onChange={() => setRegion("na")}>
                    North America
                  </option>
                  <option value="TW" onChange={() => setRegion("tw")}>
                    Taiwan
                  </option>
                  <option value="KR" onChange={() => setRegion("kr")}>
                    Korea
                  </option>
                  <option value="CN" onChange={() => setRegion("cn")}>
                    China
                  </option>
                </select>
              </span>
              <span>
                <label>Server:</label>
                <input type="text" value={server} onChange={(e) => setServer(e.target.value)} />
              </span>
              <span>
                <label>Character Name:</label>
                <input type="text" value={charName} onChange={(e) => setCharName(e.target.value)} />
              </span>
              <button type="submit">Search</button>
            </form>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
}
