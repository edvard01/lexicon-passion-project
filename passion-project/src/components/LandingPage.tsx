import { useEffect, useState } from "react";
import "../css/landingPage.css";

interface IAffixObject {
  region: string;
  title: string;
  leaderboard_url: string;
  affix_details: IAffixDetailsObject;
}

interface IAffixDetailsObject {
  id: number;
  name: string;
  description: string;
  icon: string;
  wowhead_url: string;
}

export function LandingPage(): JSX.Element {
  const [affixes, setAffixes] = useState<IAffixObject | null>(null);

  useEffect(() => {
    fetch(`https://raider.io/api/v1/mythic-plus/affixes?region=eu&locale=en`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setAffixes(data);
      });
  }, []);

  let displayLoader: JSX.Element = <div className="loader"></div>;
  let displayAffixes: JSX.Element[] = [];
  if (affixes !== null) {
    let affixArr: string[] = affixes.title.split(",");
    for (let i = 0; i < affixArr.length; i++) {
      displayAffixes.push(<p key={i}>{affixArr[i]}</p>);
    }
  }

  return (
    <>
      <div className="landing-page">
        <div className="content">
          <h2>Welcome!</h2>
          <div className="panels">
            <div className="panel-one">
              <h4>Current Affixes:</h4>
              {affixes === null ? displayLoader : displayAffixes}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
