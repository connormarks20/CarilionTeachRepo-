import { useNavigate } from "react-router";

export function Question4() {
    let navigate = useNavigate(); /* Router navigation variable */

    const backwardNav = () => {
        navigate("/Question3")
    };

    const forwardNav = () => {
        // navigate("/Question4");
    };

    return (
        <>
            <h1> This is Question 4 </h1>
            <button onClick={backwardNav}> Prev Page </button>
            <button onClick={forwardNav}> Next Page </button>
        </>
    )
}