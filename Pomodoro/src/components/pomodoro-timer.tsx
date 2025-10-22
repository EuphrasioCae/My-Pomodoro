import React, { useEffect } from "react";
import { useInterval } from "@/hooks/use-interval";
import { Btn } from "./btn";
import { Timer } from "./timer";

// Importando os áudios de Início e Fim do cronômetro
import bellStart from '../sounds/bell-start.mp3';
import bellFinish from '../sounds/bell-finish.mp3';

const audioStartWorking = new Audio(bellStart);
const audioStopWorking = new Audio(bellFinish);

interface Props {
    pomodoroTime: number;
    shortRestTime: number;
    longRestTime: number;
    cycles: number;
}

export function PomodoroTimer(props: Props): JSX.Element{
    const [mainTime, setMainTime] = React.useState(props.pomodoroTime);
    const [timeCounting, setTimeCounting] = React.useState(false);
    const [working, setWorking] = React.useState(false);
    const [resting, setResting] = React.useState(false);


    useEffect(() => {
        if(working) document.body.classList.add('working');
        if(resting) document.body.classList.remove('working');
    }, [working]);

    useInterval(() => {
        setMainTime(mainTime - 1);
    }, timeCounting ? 1000 : null);

    const configureWork = () => {
        setTimeCounting(true);
        setWorking(true);
        setResting(false);
        setMainTime(props.pomodoroTime);
        audioStartWorking.play();
    }

    const configureRest = (Long: boolean) => {
        setTimeCounting(true);
        setWorking(false);
        setResting(true);
        audioStopWorking.play();

        if(Long){
            setMainTime(props.longRestTime);
        }else{
            setMainTime(props.shortRestTime);
        }
    }

    return (
        <div className="pomodoro">
            <h2>You are: working</h2>

            <Timer mainTime={mainTime}/>

            <div className="controls">
                <Btn text="Work" onClick={() => configureWork()}></Btn>
                <Btn text="Rest" onClick={() => configureRest(false)}></Btn>
                <Btn 
                    className={!working && !resting ? 'hidden' : ''}
                    text={timeCounting? "Pause" : "Play"}
                    onClick={()=> setTimeCounting(!timeCounting)}>
                </Btn>
            </div>

            <div className="details">
                <p>Teste detalhe</p>
                <p>Teste detalhe</p>
                <p>Teste detalhe</p>
            </div>
        </div>
    )
}