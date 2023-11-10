export interface ResetButtonProps{
    handleReset:()=> void;
}
export const ResetButton=(props:ResetButtonProps)=>{

    return(
        <>
        <button onClick={()=>props.handleReset()}>
            Reset
        </button>
        </>
    )
}