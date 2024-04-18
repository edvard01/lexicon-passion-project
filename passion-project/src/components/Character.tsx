import { useState, FormEvent, useEffect } from "react";
import "../css/character.css";
import "../css/wow-classes.css";
import rioIcon from "../assets/raiderio-icon.png";
import wowlogsIcon from "../assets/warcraftlogs-icon-white.png";
import wowIcon from "../assets/wow-icon.png";

interface IResponse {
  achievement_points: number;
  active_spec_name: string;
  active_spec_role: string;
  class: string;
  faction: string;
  gender: string;
  honorable_kills: number;
  last_crawled_at: string;
  name: string;
  profile_banner: string;
  profile_url: string;
  race: string;
  realm: string;
  region: string;
  thumbnail_url: string;
  gear: IGear;
  guild: IGuild;
  talentLoadout: ITalents;
}

interface ITalents {
  loadout_text: string;
}

interface IGear {
  item_level_equipped: string;
  updated_at: string;
}

interface IGuild {
  name: string;
  realm: string;
}

export function Character(): JSX.Element {
  const [region, setRegion] = useState<string>("eu");
  const [server, setServer] = useState<string>("");
  const [charName, setCharName] = useState<string>("");
  const [response, setResponse] = useState<IResponse | null>(null);
  const [characterJsx, setDrawCharacter] = useState<JSX.Element>(<></>);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchCharData();
  };

  useEffect(() => {
    setDrawCharacter(drawCharacter());
  }, [response]);

  const drawCharacter = () => {
    let jsxElement: JSX.Element = <></>;
    if (response !== null) {
      let itemLevelColor: string = "";
      const itemLevel: number = Number(response.gear.item_level_equipped);
      if (itemLevel > 484) {
        itemLevelColor = "legendary";
      } else if (itemLevel > 480) {
        itemLevelColor = "superior";
      } else if (itemLevel > 460) {
        itemLevelColor = "rare";
      } else {
        itemLevelColor = "uncommon";
      }
      jsxElement = (
        <>
          <div className={response.faction.toLowerCase()}>
            <div className="character-section">
              <h3 className={response.class.toLowerCase()}>{response.name}</h3>
              <p className="guild">&lt;{response.guild.name}&gt;</p>
              <img src={response.thumbnail_url} alt="Character Portrait" />
              <span className="name">
                <p className={response.class.toLowerCase()}>
                  {response.active_spec_name} {response.class}
                </p>
              </span>
            </div>
          </div>
          <div className="link-section">
            <div className="nav-links">
              <a target="_blank" className="rio" href={response.profile_url}>
                <img src={rioIcon} alt="link to raiderio page" />
              </a>
              <a target="_blank" href={`https://www.warcraftlogs.com/character/${response.region}/${response.realm}/${response.name}`} className="wowlogs">
                <img src={wowlogsIcon} alt="link to warcraftlogs page" />
              </a>
              <a
                target="_blank"
                href={`https://worldofwarcraft.blizzard.com/en-gb/character/${response.region}/${response.realm}/${response.name}`}
                className="armory"
              >
                <img src={wowIcon} alt="link to world of warcraft armory" />
              </a>
            </div>
          </div>
          <div className="char-info-section">
            <p>
              Item Level: <span className={itemLevelColor}>{response.gear.item_level_equipped}</span>
            </p>
            <a className="talent-calc" target="_blank" href={`https://www.wowhead.com/talent-calc/rogue/assassination/${response.talentLoadout.loadout_text}`}>
              Talents &rarr;
            </a>
          </div>
        </>
      );
    }

    return jsxElement;
  };

  function fetchCharData() {
    fetch(`https://raider.io/api/v1/characters/profile?region=${region}&realm=${server}&name=${charName}&fields=gear,talents:categorized,guild`)
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
                <label>Character Name:</label>
                <input type="text" value={charName} onChange={(e) => setCharName(e.target.value)} />
              </span>
              <button type="submit">Search</button>
            </form>
          </div>
          <div className="panel-two">{response !== null ? characterJsx : <></>}</div>
        </div>
      </div>
    </>
  );
}
