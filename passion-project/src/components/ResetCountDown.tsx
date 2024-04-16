import { useEffect, useState } from "react";

interface IResetCountDownProps {
  naResetTime: string;
  euResetTime: string;
}

export function ResetCountDown({ naResetTime, euResetTime }: IResetCountDownProps): JSX.Element {
  const [euResetDate, setEuResetDate] = useState<Date>(new Date(euResetTime));
  const [naResetDate, setNaResetDate] = useState<Date>(new Date(naResetTime));

  const [euRemainingTime, setEuRemainingTime] = useState<number>(0);
  const [naRemainingTime, setNaRemainingTime] = useState<number>(0);

  const euTimeDiff = () => {
    let localTime = new Date();
    const euDifference = euResetDate.getTime() - localTime.getTime();

    return euDifference;
  };

  const naTimeDiff = () => {
    let localTime = new Date();
    const naDifference = naResetDate.getTime() - localTime.getTime();
    return naDifference;
  };

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setEuRemainingTime(euTimeDiff());
      setNaRemainingTime(naTimeDiff());
    }, 1000);
  }, []);

  const calculateTimeDisplay = (timeInMs: number): JSX.Element => {
    const days = Math.floor(timeInMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeInMs - days * 24 * 60 * 60 * 1000) / (1000 * 60 * 60)) % 24;
    const minutes = Math.floor((timeInMs - (days * 24 * 60 * 60 * 1000 + hours * 1000 * 60 * 60)) / (1000 * 60)) % 60;
    const seconds = Math.floor((timeInMs - (days * 24 * 60 * 60 * 1000 + hours * 1000 * 60 * 60 + minutes * 1000 * 60)) / 1000) % 60;

    if (days === 0) {
      return (
        <>
          {hours} hours {minutes} minutes {seconds} seconds
        </>
      );
    } else {
      return (
        <>
          {days} days {hours} hours {minutes} minutes {seconds} seconds
        </>
      );
    }
  };

  return (
    <>
      <div className="timer-content">
        <span className="timer-wrapper">
          <h2>EU reset is in:</h2>
          <p>{calculateTimeDisplay(euRemainingTime)}</p>
        </span>
        <span className="timer-wrapper">
          <h2>NA reset is in:</h2>
          <p>{calculateTimeDisplay(naRemainingTime)}</p>
        </span>
      </div>
    </>
  );
}
