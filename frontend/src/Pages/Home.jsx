import { useEffect, useState } from "react";
import Form from "../Components/Form.jsx";
import ProgressBar from "../Components/ProgressBar.jsx";
import { Link } from "react-router-dom"
import { useNavigate } from "react-router";
import Questions from "./Questions.jsx";
import Accordion from 'react-bootstrap/Accordion';
import TeachLogo from "../assets/teachlogowhite.jpg";  
import TeachCombinedLogos from "../assets/teachcombinedlogos.png"; 
import TeachLogoNoWords from "../assets/teachlogowithoutwords.png"; 
import TeachLogoRoot from "../assets/teachlogoroot.png"; 
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

                {/* <h1>Carilion TEACH</h1>
                <p style={{ fontSize: "18px", fontWeight: "bold" }}>
                    Backend Response: {backendMessage}
                </p> */}

                {/* Welcome Section */}
                <div className="welcome-section">
                    {/* Left Half */}
                    <div className="welcome-left">
                        <h1 className="welcome-title">Welcome</h1>
                        <h3 className="welcome-subtitle">To TEACH Resident Educator Resources</h3>
                    </div>

                    {/* Right Half */}
                    <div className="welcome-right">
                        <hr className="separator-2" />
                        <div className="welcome-description">
                            <p style={{marginBottom: "50px"}}>
                                This page includes a collection of materials and resources for the various topics
                                and skills hospital residents will learn and master throughout their residency program.
                            </p>

                            <p>
                                All resources are organized into their respective topics below to read and learn more about. 
                            </p>
                        </div>
                    </div>

                    {/* Overlay Image */}
                    <img src={TeachLogoRoot} alt="Overlay Image" className="welcome-overlay" />
                </div>

                {/* Black Separator Line */}
                <hr className="separator" />
                
                <div className="section-title-container">
                    <p className="section-title">About the Resident Educator Topics</p>
                    <hr className="separator-2" />
                </div>

                {/* Section Descriptions */}
                <div className="section-description">
                    <p> 
                        As a part of TEACH’s goal to promote and foster a strong community of 
                        educators and learners at Carilion Clinic, the following topics and resources are 
                        designed to help build a solid foundation in the various key skills needed as a 
                        resident educator, enhance teaching abilities, and expand on the subjects to 
                        foster a deeper understanding of the materials.
                    </p>

                    <p>
                        The following resources cover multiple topics. To learn more about a specific 
                        subject, click on the arrow to expand the menu.
                    </p>
                </div>
                
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
            
            {/* */}
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
                        <p style={{ textAlign: "left" }}>
                            This tool is designed to help residents evaluate their confidence and skills across
                            key educational domains during their time in the hospital. 
                        </p>
                        <p style={{ textAlign: "left" }}>
                            By completing this survey, you’ll have the opportunity to reflect on your abilities
                            as both a learner and educator, allowing you to identify strengths and areas for growth,
                            and access resources corresponding to sections that may need improvement.
                        </p>
                        <button className="start-survey-button" onClick={startSurvey}>Begin Survey</button>
                    </div>
                </div>
            </div>

            {/* */}
            <hr className="separator" />
            
            {/* TEACH logos */}
            <div className="home-bottom-bar">
                <img src={TeachCombinedLogos}/>
            </div>
        </div>
    )
}