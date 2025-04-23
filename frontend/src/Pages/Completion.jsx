// Functional imports
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { useState } from "react";

import TeachLogo from "../assets/teachlogowhite.jpg"; /* Teach logo */
import { educatortopicdata } from "../assets/educatortopicdata.js"; /* Resource data */
import './Completion.css'; /* CSS import */

export function Completion() {
    const location = useLocation(); /* Location variable */
    let navigate = useNavigate(); /* Navigation variable */
    const improvementAreas = location.state?.improvementAreas || []; /* Improvement areas from Questions.jsx */

    // Maps areas for improvement to accordion indices
    const mapAreasToAccordionIndices = (areas) => {        
        return educatortopicdata
          .map((topic, index) =>
            areas.includes(topic.category) ? index : null
          )
        .filter((i) => i !== null);
    };
      
    // Navigates to home, displaying the relevant resources based on assessment results
    const navigateHomeWithResources = () => {
        const matchedIndices = mapAreasToAccordionIndices(improvementAreas);
        const url = `/?resources=${matchedIndices.join(",")}`;
        navigate(url);
    }

    return (
        <div className="completion-container">
            {/* Horizontal bar at the top */}
            <div className="top-bar">
                <p className="top-bar-title">Resident Educator Self-Assessment</p>
                <img src={TeachLogo} style={{height: "80px"}}/>
            </div>

            {/* White box holding content elements */}
            <div className="content-box">
                {/* Thank you header */}
                <p className="content-header">Thank you for Completing the Self-Assessment!</p>

                {/* Section description */}
                <p className="content-description">
                    Your response provides valuable insight into your strenghts and areas for growth
                    as an educator. Developing your teaching skills is an ongoing process, and TEACH
                    is here to support you!
                </p>

                {/* Content divider */}
                <hr className="content-divider" />

                {/* Areas of improvement */}
                <div className="content-domains">
                    <p>
                        Review the following teaching domains with associated resources linked to your areas
                        of improvement:
                    </p>
                    
                    {/* Check if there are improvement areas */}
                    {improvementAreas.length > 0 ? (
                    <>
                        <ul className="content-domains-items">
                                {improvementAreas.map((area, index) => (
                                    <li key={index}>{area}</li>
                                ))}
                        </ul>
                    </>
                    ) : (
                        <p className="no-improvements-text">
                            You have identified confidence across all areas of teaching! Recognizing your strengths
                            is an important step in professional growth. While no immediate areas for development
                            were identified, continued reflection and feedback from peers and learners can offer
                            new insights as your teaching environment evolves. We encourage you to remain open to
                            learning opportunities and consider mentoring others or exploring advanced faculty development
                            topics to further enhance your impact as an educator.
                        </p>
                    )}
                </div>

                {/* Home navigation button */}
                <button className="content-button" onClick={() => navigateHomeWithResources()}>Learn More about these Topics</button>
                
                {/* Contact content */}
                <p className="content-contact">
                    If you have any questions or would like to further discuss your self-assessment results,
                    please contact Mariah Rudd, <a href="mailto:mjrudd@carilionclinic.org" target="_blank">mjrudd@carilionclinic.org</a>
                </p>
                
                {/* Footer content */}
                <p className="content-footer">
                    Thank you for your dedication to teaching and learning!
                </p>
            </div>
        </div>
    )
}