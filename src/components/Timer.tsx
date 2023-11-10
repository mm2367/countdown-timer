import { useCallback, useEffect, useMemo, useState } from "react";
export interface TimerProps {
    initialTime: string;
    setSubmitButtonDisabled:(isDisabled:boolean)=>void;

}
export const Timer = (props: TimerProps) => {
    const [localTimer, setLocalTimer] = useState<number>(0);
    const [startTimer, setstartTimer] = useState<boolean>(false);
    const [endTimer, setEndTimer] = useState<boolean>();
    const [showError,setShowError]=useState<boolean>(false);
    const [showAnimation,setShowAnimation]=useState<boolean>(false);
    
    const prettyPrintTime = useMemo(() => {
        let countDownDate = new Date(localTimer).getTime();
        let now = new Date().getTime();

        let distance = countDownDate - now;
        //show animation in last 60 seconds.
        if(((distance/1000)<=60) && ((distance/1000)>0)){
            console.log(distance)
            setShowAnimation(true);
        }
        else{
            setShowAnimation(false)
        }

        //show error if the user inuts an invalid entry
        if(!startTimer && distance<0 && localTimer!==0){
            setShowError(true);
            setstartTimer(false);
            localStorage.removeItem('countDownTime')
            setLocalTimer(0)
        }

        //show end countdown message when time is up
        if(startTimer && distance<=0){
            setstartTimer(false)
            setEndTimer(true)
            localStorage.removeItem('countDownTime')

        }
        //start the timer and disable changes when timer starts
        if(!startTimer && distance>0){
            setShowError(false)
            setEndTimer(false)
            setstartTimer(true)
            props.setSubmitButtonDisabled(true);
            
        }
        //pretty prints the timer format
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        return `${days} days : ${hours} hours: ${minutes} mins: ${seconds} seconds`;

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
        setEndTimer(false)
        setstartTimer(false)
        setShowError(false)
    }

    }, [props.initialTime])

    const countDownEndedMessage = 'Countdown has ended';
    const startCountDownMessage = 'Submit a time to get the countdown started';
    const errorMessage = 'Please select a time in the future'
    
    //renders timer or error message 
    const renderTimer = useCallback(() => {
        if (startTimer) {
            return prettyPrintTime
        }
        else if(showError){
            return errorMessage
        }
        else if(!endTimer&&!startTimer){
            return startCountDownMessage
        }
    }, [localTimer,endTimer,startTimer])
    return (
        <div className="header-font mb-3">
            <div className={showAnimation? 'blinking-animation':''}>{endTimer? countDownEndedMessage: renderTimer()}</div>
        </div>
    )
}