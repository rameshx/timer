import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { Pause } from '../common/Pause';
import { Time } from '../Timer.types';
import {
  formatTime,
  isTimeTruthy,
  secondsToTime,
  timeToSeconds,
} from '../Util';

import './Countdown.css';

interface ProgressRingProps {
  radius: number;
  stroke: number;
  progress: number;
}

const ProgressRing: FC<ProgressRingProps> = ({ radius, stroke, progress }) => {
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg height={radius * 2} width={radius * 2}>
      <circle
        stroke="white"
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={circumference + ' ' + circumference}
        style={{ strokeDashoffset }}
        stroke-width={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
    </svg>
  );
};

interface CountdownProps {
  startTime: Time;
}

export const Countdown: FC<CountdownProps> = ({ startTime }) => {
  const [time, setTime] = useState<Time>(startTime);
  const [pause, setPause] = useState(false);

  const timer = useRef<undefined | NodeJS.Timer>();

  const [hours, minutes, seconds] = useMemo(() => formatTime(time), [time]);

  const clearTimer = () => {
    if (timer.current === undefined) return;
    clearInterval(timer.current);
    timer.current = undefined;
  };

  useEffect(() => {
    clearTimer();
    timer.current = setInterval(() => {
      setTime((prevTime) => {
        if (!isTimeTruthy(prevTime)) {
          // TODO
          // setRunning(false);
          clearTimer();
          return prevTime;
        }
        return secondsToTime(timeToSeconds(prevTime) - 1);
      });
    }, 1000);
  }, []);

  return (
    <>
      <div className="countdown-container">
        <ProgressRing radius={115} stroke={4} progress={50} />
        <time className={`countdown${pause ? ' pause' : ''}`}>
          {hours}:{minutes}:{seconds}
        </time>
      </div>

      <footer>
        <button className="btn">DELETE</button>
        <button onClick={() => setPause(true)} className="fab">
          <Pause />
        </button>
      </footer>
    </>
  );
};
