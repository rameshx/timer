import { FC, useMemo, useState } from 'react';
import { Play } from '../common/Play';
import { Delete } from '../common/Delete';
import { Countdown } from '../countdown/Countdown';
import { Numkey } from '../numkey/Numkey';
import { Time } from '../Timer.types';
import { formatTime, isTimeTruthy, MAX_TIME_LENGTH, NUMKEYS } from '../Util';

import './Timer.css';

export const Timer: FC = () => {
  const [time, setTime] = useState<Time>('');
  const [running, setRunning] = useState(false);

  const [hours, minutes, seconds] = useMemo(() => formatTime(time), [time]);
  const showStart = useMemo(
    () => isTimeTruthy(time) && !running,
    [time, running]
  );

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

  const handleStart = () => {
    setRunning(true);
  };

  return (
    <div className="timer">
      <header>
        <h1>Timer</h1>
      </header>
      {running && <Countdown startTime={time} />}
      {!running && (
        <>
          <time className="output">
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
              <Delete />
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

      {showStart && (
        <footer>
          <button onClick={handleStart} className="fab">
            <Play />
          </button>
        </footer>
      )}
    </div>
  );
};
