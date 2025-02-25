import { useNavigate } from "react-router";

export function Question2() {
    let navigate = useNavigate(); /* Router navigation variable */

    const backwardNav = () => {
        navigate("/Question1")
    };

    const forwardNav = () => {
        navigate("/Question3");
    };

    return (
        <>
            <h1> This is Question 2 </h1>
            <button onClick={backwardNav}> Prev Page </button>
            <button onClick={forwardNav}> Next Page </button>
        </>
    )
}