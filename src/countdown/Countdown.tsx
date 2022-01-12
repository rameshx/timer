import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Delete } from '../common/Delete';
import { Pause } from '../common/Pause';
import { Play } from '../common/Play';
import { Time } from '../Timer.types';
import {
  DEFAULT_PROGRESS,
  formatTime,
  getProgress,
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
        stroke="var(--brand-1-focus)"
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={circumference + ' ' + circumference}
        style={{ strokeDashoffset }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
    </svg>
  );
};

interface CountdownProps {
  startTime: Time;
  onDelete: () => void;
}

export const Countdown: FC<CountdownProps> = ({ startTime, onDelete }) => {
  const [time, setTime] = useState<Time>(startTime);
  const [pause, setPause] = useState(false);
  const [progress, setProgress] = useState(DEFAULT_PROGRESS);

  const timerRef = useRef<undefined | NodeJS.Timer>();

  const [hours, minutes, seconds] = useMemo(() => formatTime(time), [time]);
  const showPause = useMemo(() => isTimeTruthy(time), [time]);

  const clearTimer = () => {
    if (timerRef.current !== undefined) {
      clearInterval(timerRef.current);
      timerRef.current = undefined;
    }
  };

  const startTimer = useCallback(() => {
    clearTimer();
    timerRef.current = setInterval(() => {
      setTime((prevTime) => {
        if (!isTimeTruthy(prevTime)) {
          clearTimer();
          return prevTime;
        }
        return secondsToTime(timeToSeconds(prevTime) - 1);
      });
    }, 1000);
  }, []);

  const pauseTimer = () => {
    clearTimer();
    setPause(true);
  };

  const resumeTimer = () => {
    setPause(false);
    startTimer();
  };

  const deleteTimer = () => {
    clearTimer();
    onDelete();
  };

  useEffect(() => {
    startTimer();
  }, [startTimer]);

  useEffect(() => {
    setProgress(getProgress(startTime, time));
  }, [startTime, time]);

  return (
    <>
      <div className="countdown-container">
        <ProgressRing radius={115} stroke={4} progress={progress} />
        <time className={`countdown${pause ? ' pause' : ''}`}>
          {hours}:{minutes}:{seconds}
        </time>
      </div>

      <footer>
        <button
          onClick={deleteTimer}
          className={`fab${!showPause ? ' gcs-2' : ''}`}
        >
          <Delete />
        </button>
        {showPause && (
          <>
            {pause ? (
              <button onClick={resumeTimer} className="fab gcs-2">
                <Play />
              </button>
            ) : (
              <button onClick={pauseTimer} className="fab gcs-2">
                <Pause />
              </button>
            )}
          </>
        )}
      </footer>
    </>
  );
};
