import { FC, useMemo, useState } from 'react';
import { Play } from '../common/Play';
import { Backspace } from '../common/Backspace';
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

  const handleBackspace = () => {
    setTime((prevTime) =>
      !prevTime ? prevTime : prevTime.slice(0, prevTime.length - 1)
    );
  };

  const handleStart = () => {
    setRunning(true);
  };

  const handleDelete = () => {
    setRunning(false);
    setTime('');
  };

  return (
    <div className="timer">
      <header>
        <h1>Timer</h1>
      </header>
      {running && <Countdown startTime={time} onDelete={handleDelete}/>}
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
            <button onClick={handleBackspace} className="icon">
              <Backspace />
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
          <footer>
            {showStart && (
              <button onClick={handleStart} className="fab gcs-2">
                <Play />
              </button>
            )}
          </footer>
        </>
      )}
    </div>
  );
};
