import { convertTime } from './convert-time';

export function secondsToMinutes(seconds: number): string {
    const { min, sec } = convertTime(seconds);
    return `${min} : ${sec}`;
}
