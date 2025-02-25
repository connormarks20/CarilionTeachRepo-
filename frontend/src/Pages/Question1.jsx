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
        <div>
            <h1> This is Question 1 </h1>
            <div style = {{display: "flex", justifyContent: "space-between"}}>
                <button onClick={backwardNav}> Prev Page </button>
                <button onClick={forwardNav}> Next Page </button>
            </div>
        </div>
    );
}