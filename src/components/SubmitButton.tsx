
export interface SubmitButtonProps{
    handleSubmit:()=>void;
    isDisabled:boolean;
}
export const SubmitButton=(props:SubmitButtonProps)=>{
    return (
        <>
        <button className="submit-button" disabled={props.isDisabled}onClick={props.handleSubmit}>
            Submit
        </button>
        </>
    )
}