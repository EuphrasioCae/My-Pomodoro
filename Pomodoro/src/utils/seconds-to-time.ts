import { convertTime } from './convert-time';

export function secondsToTime(seconds: number): string {
    const { hours, min, sec } = convertTime(seconds);
    return `${hours} : ${min} : ${sec}`;
}
