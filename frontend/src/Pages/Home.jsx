import { useEffect, useState } from "react";
import Form from "../Components/Form.jsx";
import ProgressBar from "../Components/ProgressBar.jsx";
import { Link } from "react-router-dom"
import { useNavigate } from "react-router";
import Questions from "./Questions.jsx";
import Accordion from 'react-bootstrap/Accordion';
import TeachLogo from "../assets/teachlogowhite.jpg";  
import './Home.css';
import { educatortopicdata } from "../assets/educatortopicdata.js";

export function Home() {
    const [backendMessage, setBackendMessage] = useState("Loading...");
    const [progress, setProgress] = useState(0); /* Progress bar variable */
    let navigate = useNavigate(); /* Router navigation variable */

    //
    let [educatorTopic, setEducatorTopic] = useState(educatortopicdata);

    // Gets data from backend when the component mounts 
    useEffect(() => {

        fetch("http://localhost:5000/") // this port might need to be changed depending on people's systems. 
        .then((res) => res.text())
        .then((data) => setBackendMessage(data))
        .catch(() => setBackendMessage("Could not connect to backend"));
    }, []);

    // Increases progress on progress bar and navigates to next page
    const startSurvey = () => {
        navigate("/Questions");         
    };

    return (
        <div>
        <div style={{ textAlign: "center", padding: "20px", fontFamily: "Arial, sans-serif" }}>
            {/* Horizontal bar at the top */}
            <div className="home-top-bar">
                <img src={TeachLogo} style={{height: "80px"}}/>
            </div>

            <h1>Carilion TEACH</h1>
            <p style={{ fontSize: "18px", fontWeight: "bold" }}>
                Backend Response: {backendMessage}
            </p>

            {/* Black Separator Line */}
            <hr className="separator" />

            {/* Section Title */}
            <text className="section-title">About the Resident Educator Topics </text>

            <hr className="separator-2" />

            <Accordion className="custom-accordion">
            {educatorTopic.map((topic, index) => (
                <Accordion.Item className="custom-accordion-item" eventKey={index.toString()} key={index} >
                    <Accordion.Header className="custom-accordion-header">{topic.category}</Accordion.Header>
                    <Accordion.Body className="custom-accordion-body">{topic.description}</Accordion.Body>
                </Accordion.Item>
            ))}
            </Accordion>
        </div>
            {/* Black Separator Line */}
            <hr className="separator" />
            
            <div className="accordion-container">
                <div className="survey-box">
                    {/* Top Half */}
                    <div className="survey-box-top">
                        Resident Educator Self-Assessment
                    </div>

                    {/* Middle Separator */}
                    <div className="survey-box-divider"></div>

                    {/* Bottom Half */}
                    <div className="survey-box-bottom">
                        <p>Description here</p>
                        <button className="start-survey-button" onClick={startSurvey}>Begin Survey</button>
                    </div>
                </div>
            </div>
        </div>
    )
}