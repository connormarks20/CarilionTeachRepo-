import { useNavigate } from "react-router";

export function Question1() {
    let navigate = useNavigate(); /* Router navigation variable */

    // Navigate to previous question
    const backwardNav = () => {
        navigate("/");
    };

    // Navigate to next question
    const forwardNav = () => {
        navigate("/Question2");
    };

    return (
        <>
            <h1> This is Question 1 </h1>
            <button onClick={backwardNav}> Prev Page </button>
            <button onClick={forwardNav}> Next Page </button>
        </>
    )
}