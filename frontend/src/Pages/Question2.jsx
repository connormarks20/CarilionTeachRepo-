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
        <div>
            <h1> This is Question 2 </h1>
            <div style = {{display: "flex", justifyContent: "space-between"}}>
                <button onClick={backwardNav}> Prev Page </button>
                <button onClick={forwardNav}> Next Page </button>
            </div>
        </div>
    );
}