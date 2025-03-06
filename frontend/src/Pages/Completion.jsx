import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";

export function Completion() {
    const location = useLocation();
    const weaknessAreas = location.state?.weaknessAreas || [];
    
    return (
        <div>
            <h1>Completion Page</h1>
            <p>Weakness Areas:</p>
            <ul>
                {weaknessAreas.map((area, index) => (
                    <li key={index}>{area}</li>
                ))}
            </ul>
        </div>
    )
}