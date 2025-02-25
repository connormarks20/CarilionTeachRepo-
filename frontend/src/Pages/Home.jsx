import { useEffect, useState } from "react";
import Form from "../Components/Form.jsx";
import ProgressBar from "../Components/ProgressBar.jsx";
import { Link } from "react-router-dom"
import { useNavigate } from "react-router";

export function Home() {
    const [backendMessage, setBackendMessage] = useState("Loading...");
    const [progress, setProgress] = useState(0); /* Progress bar variable */
    let navigate = useNavigate(); /* Router navigation variable */

    // Gets data from backend when the component mounts 
    useEffect(() => {

        fetch("http://localhost:5000/") // this port might need to be changed depending on people's systems. 
        .then((res) => res.text())
        .then((data) => setBackendMessage(data))
        .catch(() => setBackendMessage("Could not connect to backend"));
    }, []);

    // Increases progress on progress bar and navigates to next page
    const startSurvey = () => {
        navigate("/Question1");         
    };

    return (
        <div style={{ textAlign: "center", padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <h1>Carilion TEACH</h1>
        <p style={{ fontSize: "18px", fontWeight: "bold" }}>
            Backend Response: {backendMessage}
        </p>
        <hr style={{ margin: "20px 0" }} />
        <ProgressBar
                    bgcolor="orange"
                    progress={progress}
                    height={30}
                />
        <Form />
        <button onClick={startSurvey}> Start </button>
        </div>
    )
}