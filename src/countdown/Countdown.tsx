import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Back } from '../svgs/Back';
import { Delete } from '../svgs/Delete';
import { Pause } from '../svgs/Pause';
import { Play } from '../svgs/Play';
import { Reset } from '../svgs/Reset';
import { Time } from '../Timer.types';
import {
  COUNTDOWN_DELAY,
  DEFAULT_PROGRESS,
  getProgress,
  inputTimeToSeconds,
  secondsToHMS,
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
  onBackOrDelete: () => void;
}

export const Countdown: FC<CountdownProps> = ({ startTime, onBackOrDelete }) => {
  const [remainingSeconds, setRemainingSeconds] = useState<number>(() =>
    inputTimeToSeconds(startTime)
  );
  const [pause, setPause] = useState(false);
  const [progress, setProgress] = useState(DEFAULT_PROGRESS);

  const timerRef = useRef<undefined | NodeJS.Timer>();

  const [hours, minutes, seconds] = useMemo(
    () => secondsToHMS(remainingSeconds),
    [remainingSeconds]
  );
  const isTimeLeft = useMemo(() => remainingSeconds > 0, [remainingSeconds]);

  const clearTimer = () => {
    if (timerRef.current !== undefined) {
      clearInterval(timerRef.current);
      timerRef.current = undefined;
    }
  };

  const startTimer = useCallback(() => {
    clearTimer();
    timerRef.current = setInterval(() => {
      setRemainingSeconds((prevSeconds) => {
        if (prevSeconds <= 0) {
          clearTimer();
          return prevSeconds;
        }
        return prevSeconds - 1;
      });
    }, COUNTDOWN_DELAY);
  }, []);

  const pauseTimer = () => {
    clearTimer();
    setPause(true);
  };

  const resumeTimer = () => {
    setPause(false);
    startTimer();
  };

  const handleBackOrDelete = () => {
    clearTimer();
    onBackOrDelete();
  };

  const resetTimer = () => {
    setRemainingSeconds(inputTimeToSeconds(startTime));
    startTimer();
    setPause(false);
  };

  useEffect(() => {
    startTimer();
  }, [startTimer]);

  useEffect(() => {
    setProgress(getProgress(inputTimeToSeconds(startTime), remainingSeconds));
  }, [startTime, remainingSeconds]);

  return (
    <>
      <div className="countdown-container">
        <ProgressRing radius={115} stroke={4} progress={progress} /> 
        <time className={`countdown${pause ? ' pause' : ''}`}>
          <span>{hours}</span>
          <span>:</span>
          <span>{minutes}</span>
          <span>:</span>
          <span>{seconds}</span>
        </time>
      </div>

      <footer>
        {isTimeLeft ? (
          <button onClick={handleBackOrDelete} className={`fab delete`}>
            <Delete />
          </button>
        ) : (
          <button onClick={handleBackOrDelete} className="fab">
            <Back />
          </button>
        )}
        {isTimeLeft && (
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
        <button onClick={resetTimer} className="fab reset">
          <Reset />
        </button>
      </footer>
    </>
  );
};
