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
import TeachLogoPlantSmall from "../assets/teachlogoplantsmall.png"; 
import TeachLogoPlantMedium from "../assets/teachlogoplantmedium.png"; 
import TeachLogoPlantLarge from "../assets/teachlogoplantlarge.png"; 
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
            <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif" }}>
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
                        <h3 className="welcome-subtitle">To TEACH to Go!</h3>
                    </div>

                    {/* Right Half */}
                    <div className="welcome-right">
                        <hr className="separator-2" />
                        <div className="welcome-description">
                            <p style={{marginBottom: "50px"}}>
                                TEACH to Go is your mobile companion, offering a comprehensive collection of teaching resources tailored
                                for health professions educators at Carilion Clinic, the Virginia Tech Carilion School of Medicine,
                                and Radford University Carilion.
                            </p>

                            <p>
                                With TEACH to Go, you can:
                            </p>

                            {/* <ul>
                                <li>Access Educator Resources</li>
                                <li>Complete a resident educator self-assessment</li>
                                <li>Stay Informed: Receive updates on upcoming events and educational opportunities</li>
                            </ul> */}
                        </div>
                    </div>

                    {/* Overlay Image */}
                    <img src={TeachLogoPlantSmall} alt="Overlay Image" className="welcome-overlay-plant-small" />
                    <img src={TeachLogoPlantMedium} alt="Overlay Image" className="welcome-overlay-plant-medium" />
                    <img src={TeachLogoPlantLarge} alt="Overlay Image" className="welcome-overlay-plant-large" />
                    <img src={TeachLogoRoot} alt="Overlay Image" className="welcome-overlay-root" />
                </div>

                {/* Black Separator Line */}
                <hr className="separator" style={{margin: "40px 0"}} />
                
                <div className="section-title-container">
                    <p className="section-title">About the Resident Educator Topics</p>
                    <hr className="separator-2" />
                </div>

                {/* Section Descriptions */}
                <div className="section-description">
                    <p> 
                        As an extension of the Teaching Excellence Academy for Collaborative Healthcare (TEACH),
                        our mission is to promote learning excellence by creating a community of educators
                        and fostering their development as teachers, learners, and education scholars. 
                    </p>

                    <p>
                        The following resources will link to external sites. To learn more about a specific 
                        subject, click on the arrow to expand the menu.
                    </p>
                </div>
                
                <Accordion className="custom-accordion">
                {educatorTopic.map((topic, index) => (
                    <Accordion.Item className="custom-accordion-item" eventKey={index.toString()} key={index}>
                    <Accordion.Header className="custom-accordion-header">{topic.category}</Accordion.Header>
                    <Accordion.Body className="custom-accordion-body">
                        {/* Ensure description is an array before mapping */}
                        {Array.isArray(topic.description) ? (
                        <ul>
                            {topic.description.map((desc, i) => {
                            // Handle direct resources
                            if (desc.title) {
                                return (
                                <li key={i} style={{ marginBottom: "1rem" }}>
                                    <a href={desc.url} target="_blank" rel="noopener noreferrer">
                                    {desc.title}
                                    </a>
                                    {desc.source && <> — <em>{desc.source}</em></>}
                                    {desc.type === "video" && <span> 🎥</span>}
                                    {desc.type === "article" && <span> 📄</span>}
                                </li>
                                );
                            }

                            // Handle nested structure with subcategory + details
                            return (
                                <li key={i} style={{ marginBottom: "1rem" }}>
                                <strong>{desc.subcategory}</strong>
                                <ul>
                                    {desc.details.map((detail, j) => (
                                    <li key={j} style={{ marginBottom: "1rem" }}>
                                        <a href={detail.url} target="_blank" rel="noopener noreferrer">
                                        {detail.title}
                                        </a>
                                        {detail.source && <> — <em>{detail.source}</em></>}
                                        {detail.type === "video" && <span> 🎥</span>}
                                        {detail.type === "article" && <span> 📄</span>}
                                    </li>
                                    ))}
                                </ul>
                                </li>
                            );
                            })}
                        </ul>
                        ) : (
                        <p>{topic.description}</p>
                        )}
                    </Accordion.Body>
                    </Accordion.Item>
                ))}
                </Accordion>
            </div>

            {/* Black Separator Line */}
            <hr className="separator" style={{margin: "40px 0"}} />
            
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