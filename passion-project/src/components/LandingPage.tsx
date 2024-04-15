import { useEffect, useState } from "react";
import "../css/landingPage.css";
import bolstering from "../assets/bolstering.jpg";

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
  const [displayAffixes, setDisplayAffixes] = useState<JSX.Element[]>([]);

  useEffect(() => {
    fetch(`https://raider.io/api/v1/mythic-plus/affixes?region=eu&locale=en`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setAffixes(data);
      });
  }, []);

  useEffect(() => {
    if (affixes !== null) {
      let tempJsxArr: JSX.Element[] = [];
      console.log(true);
      let affixArr: string[] = affixes.title.split(", ");
      console.log(affixArr.length);
      for (let i = 0; i < affixArr.length; i++) {
        let imageUrl: string = bolstering;
        console.log(imageUrl);
        let jsxElement: JSX.Element = (
          <span key={i} className="affix-row">
            <img src={bolstering} />
            <p>{affixArr[i]}</p>
          </span>
        );
        tempJsxArr.push(jsxElement);
      }
      setDisplayAffixes(tempJsxArr);
    }
  }, [affixes]);

  let displayLoader: JSX.Element = <div className="loader"></div>;

  return (
    <>
      <div className="landing-page">
        <div className="content">
          <h2>Welcome!</h2>
          <div className="panels">
            <div className="panel-one">
              <h4>Current Affixes (EU):</h4>
              <span>{affixes === null ? displayLoader : displayAffixes}</span>
            </div>
            <div className="panel-two"></div>
          </div>
        </div>
      </div>
    </>
  );
}
