import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import TeachLogo from "../assets/teachlogowhite.jpg";  
import './Completion.css';

export function Completion() {
    const location = useLocation();
    const improvementAreas = location.state?.improvementAreas || [];

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

                {/*  */}
                <div className="content-domains">
                    <p>
                        Review the following teaching domains with associated resources linked to your areas
                        of improvement:
                    </p>
                    <ul className="content-domains-items">
                        {improvementAreas.map((area, index) => (
                            <li key={index}>{area}</li>
                        ))}
                    </ul>
                </div>

                {/*  */}
                <button className="content-button">Learn More about these Topics</button>
                
                {/* */}
                <p className="content-contact">
                    If you have any questions or would like to further discuss your self-assessment results,
                    please contact Mariah Rudd, mjrudd@carilionclinic.org
                </p>

                <p className="content-footer">
                    Thank you for your dedication to teaching and learning!
                </p>
            </div>
        </div>
    )
}