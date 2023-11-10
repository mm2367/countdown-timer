export interface ResetButtonProps{
    handleReset:()=> void;
}
export const ResetButton=(props:ResetButtonProps)=>{

    return(
        <>
        <button className='reset-button'onClick={()=>props.handleReset()}>
            Reset
        </button>
        </>
    )
}