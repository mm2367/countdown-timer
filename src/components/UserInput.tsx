export interface UserInputProps{
    handleChange:(countDownDate:string)=>void;
    value:string;
}
export const UserInput=(props:UserInputProps)=>{
    const minLimit=new Date().toISOString().slice(0,16);

    return(
        <div className="my-4">
            <input id='time-input' value={props.value} onChange={(inputValue)=>props.handleChange(inputValue.target.value)} type='datetime-local'   min={minLimit}/>
        </div>
    )
}