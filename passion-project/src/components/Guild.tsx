import { FormEvent, useEffect, useState } from "react";
import "../css/guild.css";

export function Guild(): JSX.Element {
  const [region, setRegion] = useState<string>("eu");
  const [server, setServer] = useState<string>("");
  const [guildName, setCharName] = useState<string>("");
  const [response, setResponse] = useState<null>(null);

  function fetchCharData() {
    fetch(`https://raider.io/api/v1/guilds/profile?region=${region}&realm=${server}&name=${guildName}&fields=raid_progression,raid_rankings`)
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setResponse(data);
      });
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchCharData();
  };

  useEffect(() => {
    console.log(response);
  }, [response]);
  return (
    <>
      <div className="page">
        <div className="content">
          <div className="panel-one">
            <h3>Look up your World of Warcraft character:</h3>
            <form onSubmit={handleSubmit}>
              <span>
                <label>Realm:</label>
                <select name="realm">
                  <option value="EU" onChange={() => setRegion("eu")}>
                    Europe
                  </option>
                  <option value="US" onChange={() => setRegion("us")}>
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
                <label>Guild Name:</label>
                <input type="text" value={guildName} onChange={(e) => setCharName(e.target.value)} />
              </span>
              <button type="submit">Search</button>
            </form>
          </div>
          <div className="panel-two">
            <h3>Guild name & info here</h3>
          </div>
        </div>
      </div>
    </>
  );
}
