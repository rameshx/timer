import { FC, useMemo, useRef, useState } from 'react';
import { Countdown } from '../countdown/Countdown';
import { Numkey } from '../numkey/Numkey';
import { Time } from '../Timer.types';
import {
  formatTime,
  isTimeRemaining,
  MAX_TIME_LENGTH,
  NUMKEYS,
  secondsToTime,
  timeToSeconds,
} from '../Util';

import './Timer.css';

export const Timer: FC = () => {
  const [time, setTime] = useState<Time>('');
  const [isRunning, setIsRunning] = useState(false);
  const timer = useRef<undefined | NodeJS.Timer>();
  const [hours, minutes, seconds] = useMemo(() => formatTime(time), [time]);

  const showStart = useMemo(() => isTimeRemaining(time), [time]);

  const handleNumkeyClick = (numkey: string) => {
    setTime((prevTime) => {
      if (prevTime.length === MAX_TIME_LENGTH) return prevTime;
      if (!prevTime && numkey === '0') return prevTime;
      return prevTime + numkey;
    });
  };

  const handleDelete = () => {
    setTime((prevTime) =>
      !prevTime ? prevTime : prevTime.slice(0, prevTime.length - 1)
    );
  };

  const clearTimer = () => {
    if (timer.current === undefined) return;
    clearInterval(timer.current);
    timer.current = undefined;
  };

  const handleStart = () => {
    setIsRunning(true);
    clearTimer();

    timer.current = setInterval(() => {
      setTime((prevTime) => {
        if (!isTimeRemaining(prevTime)) {
          clearTimer()
          return prevTime;
        }
        return secondsToTime(timeToSeconds(prevTime) - 1);
      });
    }, 1000);
  };

  return (
    <div className="timer">
      <header>
        <h1>Timer</h1>
      </header>

      {/* {isRunning && <Countdown />} */}

      {true && (
        <>
          <time>
            <span>
              {hours}
              <small>h</small>
            </span>
            <span>
              {minutes}
              <small>m</small>
            </span>
            <span>
              {seconds}
              <small>s</small>
            </span>
            <button onClick={handleDelete} className="icon">
              <svg viewBox="0 0 24 24">
                <path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z" />
              </svg>
            </button>
          </time>
          <hr />
          <div className="keypad">
            {NUMKEYS.map((numkey) => (
              <Numkey
                key={numkey}
                onClick={handleNumkeyClick}
                numkey={numkey}
              />
            ))}
          </div>
        </>
      )}

      <footer>
        {showStart && (
          <button onClick={handleStart} className="fab">
            <svg viewBox="0 0 24 24">
              <path d="M10 8.64L15.27 12 10 15.36V8.64M8 5v14l11-7L8 5z" />
            </svg>
          </button>
        )}
      </footer>
    </div>
  );
};
