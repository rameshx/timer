import { FC, useMemo, useState } from 'react';
import { Play } from '../svgs/Play';
import { Backspace } from '../svgs/Backspace';
import { Countdown } from '../countdown/Countdown';
import { Numkey } from '../numkey/Numkey';
import { Content, Time } from '../Timer.types';
import {
  formatInputTime,
  isTimeTruthy,
  INPUT_TIME_MAX_LENGTH,
  NUMKEYS,
} from '../Util';

import './Timer.css';

interface TimerInputProps {
  time: Time;
  onBackspace: () => void;
  onNumkeyClick: (numkey: string) => void;
}

const TimerInput: FC<TimerInputProps> = ({
  time,
  onBackspace,
  onNumkeyClick,
}) => {
  const [hours, minutes, seconds] = useMemo(
    () => formatInputTime(time),
    [time]
  );

  return (
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
        <button onClick={onBackspace} className="icon">
          <Backspace />
        </button>
      </time>
      <hr />
      <div className="keypad">
        {NUMKEYS.map((numkey) => (
          <Numkey key={numkey} onClick={onNumkeyClick} numkey={numkey} />
        ))}
      </div>
    </>
  );
};

export const Timer: FC = () => {
  const [time, setTime] = useState<Time>('');
  const [content, setContent] = useState<Content>(Content.Input);

  const showStart = useMemo(
    () => isTimeTruthy(time) && content === Content.Input,
    [time, content]
  );

  const handleNumkeyClick = (numkey: string) => {
    setTime((prevTime) => {
      if (prevTime.length === INPUT_TIME_MAX_LENGTH) return prevTime;
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
    setContent(Content.Countdown);
  };

  const handleBackOrDelete = () => {
    setContent(Content.Input);
    setTime('');
  };

  return (
    <div className="timer">
      <header>
        <h1>Timer</h1>
      </header>
      {content === Content.Countdown && (
        <Countdown startTime={time} onBackOrDelete={handleBackOrDelete} />
      )}

      {content === Content.Input && (
        <TimerInput
          time={time}
          onBackspace={handleBackspace}
          onNumkeyClick={handleNumkeyClick}
        />
      )}

      {content === Content.Input && (
        <footer>
          {showStart && (
            <button onClick={handleStart} className="fab gcs-2">
              <Play />
            </button>
          )}
        </footer>
      )}
    </div>
  );
};
