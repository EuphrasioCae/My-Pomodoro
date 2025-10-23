import React, { useEffect, useState, useCallback } from "react";
import { useInterval } from "@/hooks/use-interval";
import { Btn } from "./btn";
import { Timer } from "./timer";

// Importando os áudios de Início e Fim do cronômetro
import bellStart from '../sounds/bell-start.mp3';
import bellFinish from '../sounds/bell-finish.mp3';
import { secondsToTime } from "@/utils/seconds-to-time";

const audioStartWorking = new Audio(bellStart);
const audioStopWorking = new Audio(bellFinish);

interface Props {
    pomodoroTime: number;
    shortRestTime: number;
    longRestTime: number;
    cycles: number;
}

export function PomodoroTimer(props: Props): JSX.Element {
    const [mainTime, setMainTime] = useState(props.pomodoroTime);
    const [timeCounting, setTimeCounting] = useState(false);
    const [working, setWorking] = useState(false);
    const [resting, setResting] = useState(false);
    const [cyclesQtdManager, setCyclesQtdManager] = useState(new Array(props.cycles - 1).fill(true));
    const [completedCycles, setCompletedCucles] = useState(0);
    const [fullWorkingTime, setFullWorkingTime] = useState(0);
    const [numberOfPomodoros, setNumberOfPomodoros] = useState(0);

    useInterval(
        () => {
            setMainTime(mainTime - 1);
            if(working) setFullWorkingTime(fullWorkingTime + 1);
        }, 
        timeCounting ? 1000 : null,
    );

    const configureWork = useCallback(() => {
        setTimeCounting(true);
        setWorking(true);
        setResting(false);
        setMainTime(props.pomodoroTime);
        audioStartWorking.play();
    },
        [
            setTimeCounting,
            setWorking,
            setResting,
            props.pomodoroTime,
        ]);

    const configureRest = useCallback((Long: boolean) => {
        setTimeCounting(true);
        setWorking(false);
        setResting(true);
        audioStopWorking.play();

        if (Long) {
            setMainTime(props.longRestTime);
        } else {
            setMainTime(props.shortRestTime);
        }
    },
        [
            setTimeCounting,
            setWorking,
            setResting,
            setMainTime,
            props.longRestTime,
            props.shortRestTime
        ]);

    useEffect(() => {
        if (working) document.body.classList.add('working');
        if (resting) document.body.classList.remove('working');

        if (mainTime > 0) return;

        if (working && cyclesQtdManager.length > 0) {
            configureRest(false);
            cyclesQtdManager.pop();
        } else if (working && cyclesQtdManager.length <= 0) {
            configureRest(true);
            setCyclesQtdManager(new Array(props.cycles - 1).fill(true));
            setCompletedCucles(completedCycles + 1);
        }

        if (working) setNumberOfPomodoros(numberOfPomodoros + 1);
        if (resting) configureWork();

    }, [
        working,
        resting,
        mainTime,
        cyclesQtdManager,
        numberOfPomodoros,
        completedCycles,
        props.cycles,
        configureRest,
        setCyclesQtdManager,
        configureWork,
    ]);

    return (
        <div className="pomodoro">
            <h2>Você está: {working ? 'Trabalhando' : 'Descansando'}</h2>

            <Timer mainTime={mainTime} />

            <div className="controls">
                <Btn text="Trabalhar" onClick={() => configureWork()}></Btn>
                <Btn text="Descansar" onClick={() => configureRest(false)}></Btn>
                <Btn
                    className={!working && !resting ? 'hidden' : ''}
                    text={timeCounting ? "Pausar" : "Iniciar"}
                    onClick={() => setTimeCounting(!timeCounting)}>
                </Btn>
            </div>

            <div className="details">
                <p>Ciclos concluídos: {completedCycles}</p>
                <p>Horas trabalhadas: {secondsToTime(fullWorkingTime)}</p>
                <p>Pomodoros concluídos: {numberOfPomodoros}</p>
            </div>
        </div>
    )
}
