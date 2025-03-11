import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";

export function Completion() {
    const location = useLocation();
    const improvementAreas = location.state?.improvementAreas || [];

    return (
        <div>
            <h1>Completion Page</h1>
            <p>Suggested areas of improvement:</p>
            <ul>
                {improvementAreas.map((area, index) => (
                    <li key={index}>{area}</li>
                ))}
            </ul>
        </div>
    )
}