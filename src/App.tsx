import { useState } from 'react';
import './App.css';
import { SubmitButton } from './components/SubmitButton';
import { Timer } from './components/Timer';
import { UserInput } from './components/UserInput';
import { ResetButton } from './components/ResetButton';

export const App=()=>{
  const [initalCountdownTime,setInitialCountdownTime]=useState<string>(localStorage.getItem('countdownTime')?? '');
  const [localCountDownValue,setLocalCountDownValue]=useState<string>('');
  const handleReset=()=>{
    setInitialCountdownTime('')
    setLocalCountDownValue('')
    localStorage.removeItem('countdownTime');
  }
  
  const handleSubmit=()=>{
    setInitialCountdownTime(localCountDownValue)
    localStorage.setItem('countdownTime',localCountDownValue)
  }
  return (
    <div className="App">
      <Timer initialTime={initalCountdownTime}/>
      <UserInput  value={localCountDownValue} handleChange={setLocalCountDownValue}/>
      <SubmitButton isDisabled={localCountDownValue===''} handleSubmit={()=>handleSubmit()}/>
      <ResetButton handleReset={handleReset}/>
    </div>
  );
}
