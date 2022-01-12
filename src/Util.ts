import { Time } from "./Timer.types";

export const NUMKEYS = [1,2,3,4,5,6,7,8,9,0].map(String);
export const INPUT_TIME_MAX_LENGTH = 6;
export const COUNTDOWN_TIME_MAX_LENGTH = 6;
export const DEFAULT_PROGRESS = 100;

export const formatInputTime = (time: Time) => {
    const paddedTime = time.padStart(INPUT_TIME_MAX_LENGTH, '0');

    return [paddedTime.slice(0,2),paddedTime.slice(2,4),paddedTime.slice(4,6)]
}

export const inputTimeToSeconds = (time: Time): number => {
    const [ hours, minutes, seconds ] = formatInputTime(time);

    return (+hours * 3600) + (+minutes * 60) + +seconds;
}

export const secondsToHMS = (totalSeconds: number): string[] => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    return [hours, minutes, seconds].map(el => el.toString().padStart(2, '0'));
}

export const getProgress = (totalSeconds: number, remainingSeconds: number) => {
    return 100 - Math.floor(((totalSeconds - remainingSeconds) * 100) / totalSeconds);
}

export const isTimeTruthy = (time: Time) => !!time && time.split('').some((el) => el !== '0');
