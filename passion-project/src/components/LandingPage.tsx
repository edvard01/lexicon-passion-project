import { useEffect, useState } from "react";
import "../css/landingPage.css";
import { retrieveImage } from "../objects/AffixIcons.ts";
import { affixIcons } from "../objects/AffixIcons.ts";
import { ResetCountDown } from "./ResetCountDown.js";

type AffixKey = keyof typeof affixIcons;

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
  const [euAffixes, setEuAffixes] = useState<IAffixObject | null>(null);
  const [naAffixes, setNaAffixes] = useState<IAffixObject | null>(null);
  const [resetData, setResetData] = useState<IResetData | null>(null);
  const [euResetTime, setEuResetTime] = useState<string>("");
  const [naResetTime, setNaResetTime] = useState<string>("");
  const [displayEuAffixes, setDisplayEuAffixes] = useState<JSX.Element[]>([]);
  const [displayNaAffixes, setDisplayNaAffixes] = useState<JSX.Element[]>([]);

  useEffect(() => {
    fetch(`https://raider.io/api/v1/mythic-plus/affixes?region=eu&locale=en`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setEuAffixes(data);
      });

    fetch(`https://raider.io/api/v1/mythic-plus/affixes?region=us&locale=en`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setNaAffixes(data);
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
    if (euAffixes !== null) {
      let tempJsxArr: JSX.Element[] = [];
      let affixArr: string[] = euAffixes.title.split(", ");
      console.log(affixArr);
      for (let i = 0; i < affixArr.length; i++) {
        let imageUrl = retrieveImage(affixArr[i].toLowerCase() as AffixKey);
        console.log(imageUrl);
        let jsxElement: JSX.Element = (
          <span key={i} className="affix-row">
            <img src={imageUrl} />
            <p>{affixArr[i]}</p>
          </span>
        );
        tempJsxArr.push(jsxElement);
      }
      setDisplayEuAffixes(tempJsxArr);
    }
  }, [euAffixes]);

  useEffect(() => {
    if (naAffixes !== null) {
      let tempJsxArr: JSX.Element[] = [];
      let affixArr: string[] = naAffixes.title.split(", ");
      console.log(affixArr);
      for (let i = 0; i < affixArr.length; i++) {
        let imageUrl = retrieveImage(affixArr[i].toLowerCase() as AffixKey);
        console.log(imageUrl);
        let jsxElement: JSX.Element = (
          <span key={i} className="affix-row">
            <img src={imageUrl} />
            <p>{affixArr[i]}</p>
          </span>
        );
        tempJsxArr.push(jsxElement);
      }
      setDisplayNaAffixes(tempJsxArr);
    }
  }, [naAffixes]);

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
              <span>
                <h4>Current Affixes (EU):</h4>
                <span>{euAffixes === null ? displayLoader : displayEuAffixes}</span>
              </span>
              <span>
                <h4>Current Affixes (EU):</h4>
                <span>{naAffixes === null ? displayLoader : displayNaAffixes}</span>
              </span>
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
