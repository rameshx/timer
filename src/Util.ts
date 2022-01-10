import { Time } from "./Timer.types";

export const NUMKEYS = [1,2,3,4,5,6,7,8,9,0].map(String);
export const MAX_TIME_LENGTH = 6;

export const formatTime = (time: Time) => {
    const paddedTime = time.padStart(MAX_TIME_LENGTH, '0');

    return [paddedTime.slice(0,2),paddedTime.slice(2,4),paddedTime.slice(4,6)]
}
