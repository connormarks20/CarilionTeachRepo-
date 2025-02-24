import { useNavigate } from "react-router";

export function Question3() {
    let navigate = useNavigate(); /* Router navigation variable */

    const backwardNav = () => {
        navigate("/Question2")
    };

    const forwardNav = () => {
        navigate("/Question4");
    };

    return (
        <div>
            <h1> This is Question 3 </h1>
            <div style = {{display: "flex", justifyContent: "space-between"}}>
                <button onClick={backwardNav}> Prev Page </button>
                <button onClick={forwardNav}> Next Page </button>
            </div>
        </div>
    );
}