import './App.css';
import { useState } from 'react';
import { SubmitButton } from './components/SubmitButton';
import { Timer } from './components/Timer';
import { UserInput } from './components/UserInput';
import { ResetButton } from './components/ResetButton';

export const App=()=>{
  const [initalCountdownTime,setInitialCountdownTime]=useState<string>(localStorage.getItem('countDownTime')?? '');
  const [localCountDownValue,setLocalCountDownValue]=useState<string>('');
  const [submitButtonDisabled,setSubmitButtonDisabled]=useState<boolean>(false);
  // resets the local and user input countdown time
  const handleReset=()=>{
    localStorage.removeItem('countDownTime');
    setInitialCountdownTime('')
    setLocalCountDownValue('')
    setSubmitButtonDisabled(false)
  }
  // updates the local storage and local hook
  const handleSubmit=()=>{
    setInitialCountdownTime(localCountDownValue)
    localStorage.setItem('countDownTime',localCountDownValue)
  }

  return (
    <div className="App">
      <Timer initialTime={initalCountdownTime} setSubmitButtonDisabled={setSubmitButtonDisabled}/>
      <UserInput  value={localCountDownValue} handleChange={setLocalCountDownValue}/>
      <SubmitButton isDisabled={submitButtonDisabled} handleSubmit={()=>handleSubmit()}/>
      <ResetButton handleReset={handleReset}/>
    </div>
  );
}
