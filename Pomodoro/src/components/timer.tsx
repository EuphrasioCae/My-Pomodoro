import { secondsToTime } from "@/utils/secons-to-time";

interface Props{
    mainTime: number
}

export function Timer(props: Props): JSX.Element{
    return <div className="timer">{secondsToTime(props.mainTime)}</div>
    
}