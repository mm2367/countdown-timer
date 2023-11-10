import { render } from "@testing-library/react";
import { useCallback, useEffect, useMemo, useState } from "react";
export interface TimerProps {
    initialTime: string;

}
export const Timer = (props: TimerProps) => {
    const [localTimer, setLocalTimer] = useState<number>(0);
    const [startTimer, setstartTimer] = useState<boolean>(false);
    const [endTimer, setEndTimer] = useState<boolean>();
    const [showError,setShowError]=useState<boolean>(false);
   
    const prettyPrintTime = useMemo(() => {
        let countDownDate = new Date(localTimer).getTime();
        let now = new Date().getTime();
        let distance = countDownDate - now;

        if(!startTimer && localTimer!==0 && distance<=0){
            setShowError(true);
            setstartTimer(false)
        }
        if(startTimer && distance<=0){
            setEndTimer(true)
            setstartTimer(false)

        }
        if(!startTimer && distance>0){
            setShowError(false)
            setstartTimer(true)
            
        }
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        return `${days} days : ${hours} hours: ${minutes} min: ${seconds}`;

    }, [localTimer,props.initialTime])


    useEffect(() => {
        if (localTimer as number > 0) {
            setTimeout(() => {
                setLocalTimer(prevCount => prevCount as number - 1);
            }, 1000);

        }
    }, [localTimer])
    useEffect(() => {
    if(localTimer!==0){
        setEndTimer(false)
        setShowError(false)
    }
        setLocalTimer(new Date(props.initialTime).getTime())
    if(!props.initialTime){
        setstartTimer(false)
        setEndTimer(false)
    }

    }, [props.initialTime])
    const countDownEndedMessage = 'Countdown has ended';
    const startCountDownMessage = 'Submit a time to get the countdown started';
    const errorMessage = 'Please select a time in the future'

    const renderTimer = useCallback(() => {
        console.log(localTimer)
        if (startTimer) {
            return prettyPrintTime
        }
        else if(showError){
            return errorMessage
        }
        else if(!endTimer&&!startTimer){
            console.log(endTimer,startTimer)
            return startCountDownMessage
        }
    }, [localTimer,endTimer,startTimer])
    return (
        <div className="header-font mb-3">
            <div>{endTimer? countDownEndedMessage: renderTimer()}</div>
        </div>
    )
}