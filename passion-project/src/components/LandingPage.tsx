import { useEffect, useState } from "react";
import "../css/landingPage.css";
import { retrieveImage } from "../objects/AffixIcons.js";
import { ResetCountDown } from "./ResetCountDown.js";

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

interface IResetData {
  periods: IPeriod[];
}

interface IPeriod {
  region: string;
  previous: IWeek;
  current: IWeek;
  next: IWeek;
}

interface IWeek {
  period: number;
  start: string;
  end: string;
}

export function LandingPage(): JSX.Element {
  const [affixes, setAffixes] = useState<IAffixObject | null>(null);
  const [resetData, setResetData] = useState<IResetData | null>(null);
  const [euResetTime, setEuResetTime] = useState<string>("");
  const [naResetTime, setNaResetTime] = useState<string>("");
  const [displayAffixes, setDisplayAffixes] = useState<JSX.Element[]>([]);

  useEffect(() => {
    fetch(`https://raider.io/api/v1/mythic-plus/affixes?region=eu&locale=en`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setAffixes(data);
      });

    fetch(`https://raider.io/api/v1/periods`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setResetData(data);
      });
  }, []);

  useEffect(() => {
    if (affixes !== null) {
      let tempJsxArr: JSX.Element[] = [];
      console.log(affixes);
      let affixArr: string[] = affixes.title.split(", ");
      console.log(affixArr);
      for (let i = 0; i < affixArr.length; i++) {
        let imageUrl = retrieveImage(affixArr[i].toLowerCase());
        console.log(imageUrl);
        let jsxElement: JSX.Element = (
          <span key={i} className="affix-row">
            <img src={imageUrl} />
            <p>{affixArr[i]}</p>
          </span>
        );
        tempJsxArr.push(jsxElement);
      }
      setDisplayAffixes(tempJsxArr);
    }
  }, [affixes]);

  useEffect(() => {
    if (resetData !== null) {
      setResetTimes(resetData);
    }
  });

  const setResetTimes = (data: IResetData) => {
    console.log(data.periods[0].region);
    for (let i = 0; data.periods.length > i; i++) {
      if (data.periods[i].region === "eu") {
        console.log("eu true, ", data.periods[i].current);
        setEuResetTime(data.periods[i].current.end);
      } else if (data.periods[i].region === "us") {
        console.log("us true, ", data.periods[i].current);
        setNaResetTime(data.periods[i].current.end);
      }
    }

    console.log(euResetTime, naResetTime);
  };

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
            <div className="panel-two">
              {naResetTime !== "" || euResetTime !== "" ? <ResetCountDown naResetTime={naResetTime} euResetTime={euResetTime} /> : <></>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
