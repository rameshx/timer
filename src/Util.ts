import { Time } from "./Timer.types";

export const NUMKEYS = [1,2,3,4,5,6,7,8,9,0].map(String);
export const MAX_TIME_LENGTH = 6;

export const formatTime = (time: Time) => {
    const paddedTime = time.padStart(MAX_TIME_LENGTH, '0');

    return [paddedTime.slice(0,2),paddedTime.slice(2,4),paddedTime.slice(4,6)]
}

export const timeToSeconds = (time: Time): number => {
    const [ hours, minutes, seconds ] = formatTime(time);

    return (+hours * 3600) + (+minutes * 60) + +seconds;
}

export const secondsToTime = (totalSeconds: number): Time => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = Math.floor(totalSeconds % 60);

    return [hours, minutes, secs].join('');
}

export const isTimeTruthy = (time: Time) => !!time && time.split('').some((el) => el !== '0');
