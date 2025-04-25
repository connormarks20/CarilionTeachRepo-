// Functional imports
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router";

// Resource imports
import Accordion from 'react-bootstrap/Accordion';
import { educatortopicdata } from "../assets/educatortopicdata.js";

// Image imports
import TeachLogo from "../assets/teachlogowhite.jpg";  
import TeachCombinedLogos from "../assets/teachcombinedlogos.png"; 
import TeachLogoNoWords from "../assets/teachlogowithoutwords.png"; 
import TeachLogoRoot from "../assets/teachlogoroot.png"; 
import TeachLogoPlantSmall from "../assets/teachlogoplantsmall.png"; 
import TeachLogoPlantMedium from "../assets/teachlogoplantmedium.png"; 
import TeachLogoPlantLarge from "../assets/teachlogoplantlarge.png"; 

// CSS imports
import './Home.css';

export function Home() {
    let navigate = useNavigate(); /* Router navigation variable */

    // Accordion variables
    let [educatorTopic, setEducatorTopic] = useState(educatortopicdata);
    let accordionRef = React.createRef();
    
    // Resources variables
    const [searchParams] = useSearchParams();
    const defaultKeys = searchParams.get("resources")?.split(",") || [];

    // If navigating to resources, scrolls to accordion
    useEffect(() => {
        if (defaultKeys.length > 0) {
            accordionRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      }, []);

    // Navigates to survey page
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

                {/* Welcome section */}
                <div className="welcome-section">
                    {/* Left half */}
                    <div className="welcome-left">
                        {/* Left title */}
                        <h1 className="welcome-title">Welcome</h1>

                        {/* Left subtitle */}
                        <h3 className="welcome-subtitle">To TEACH-to-Go!</h3>
                    </div>

                    {/* Right half */}
                    <div className="welcome-right">
                        {/* Right header */}
                        <div className="welcome-right-teach-header">
                            <p style={{ margin: 0, padding: 0, lineHeight: 1.5 }}>TEACH-to-Go</p>
                        </div>

                        {/* Divider line */}
                        <div style={{ width: "100%", textAlign: "left" }}>
                            <hr className="separator-2" style={{ width: "50%", margin: "5px 0 10px 0" }} />
                        </div>

                        {/* TEACH to Go description */}
                        <div className="welcome-description">
                            <p style={{marginBottom: "50px"}}>
                                TEACH-to-Go is your mobile companion, offering a comprehensive collection of teaching resources tailored
                                for health professions educators at Carilion Clinic, the Virginia Tech Carilion School of Medicine,
                                and Radford University Carilion.
                            </p>

                            <p>
                                With TEACH-to-Go, you can:
                            </p>
                            <ul>
                                <li>Access Educator Resources</li>
                                <li>Complete a resident educator self-assessment</li>
                                <li>Stay Informed: Receive updates on upcoming events and educational opportunities</li>
                            </ul>
                        </div>
                    </div>

                    {/* Overlay images */}
                    <img src={TeachLogoPlantSmall} alt="Overlay Image" className="welcome-overlay-plant-small" />
                    <img src={TeachLogoPlantMedium} alt="Overlay Image" className="welcome-overlay-plant-medium" />
                    <img src={TeachLogoPlantLarge} alt="Overlay Image" className="welcome-overlay-plant-large" />
                    <img src={TeachLogoRoot} alt="Overlay Image" className="welcome-overlay-root" />
                </div>

                {/* Black separator line */}
                <hr className="separator" style={{margin: "40px 0"}} />
                
                {/* Section title */}
                <div className="section-title-container">
                    <p className="section-title">Health Professions Education Resources</p>
                    <hr className="separator-2" />
                </div>

                {/* Section descriptions */}
                <div className="section-description">
                    <p> 
                        As an interactive resource of TEACH Teaching Excellence Academy for Collaborative Healthcare (TEACH),
                        the purpose of this app is to provide resources and tools to promote learning excellence and fostering
                        the development of teachers, learners, and education scholars.
                    </p>

                    <p>
                        The following resources will link to external sites. To learn more about a specific 
                        subject, click on the arrow to expand the menu.
                    </p>
                </div>
                
                {/* Resource accordion */}
                <Accordion className="custom-accordion" ref={accordionRef} defaultActiveKey={defaultKeys} alwaysOpen>
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

            {/* Black separator line */}
            <hr className="separator" style={{margin: "40px 0"}} />
            
            {/* Begin self-assessment box */}
            <div className="accordion-container">
                <div className="survey-box">
                    {/* Top half */}
                    <div className="survey-box-top">
                        Resident Educator Self-Assessment
                    </div>

                    {/* Middle separator */}
                    <div className="survey-box-divider"></div>

                    {/* Bottom half */}
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

            {/* Black seperator line */}
            <hr className="separator" />
            
            {/* TEACH logos */}
            <div className="home-bottom-bar">
                <img src={TeachCombinedLogos}/>
            </div>
        </div>
    )
}