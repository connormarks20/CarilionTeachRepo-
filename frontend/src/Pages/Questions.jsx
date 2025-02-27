import { useRef, useState } from "react";
import { questiondata } from "../assets/questiondata.js";
import ProgressBar from "../Components/ProgressBar.jsx";
import { useNavigate } from "react-router";

const Questions = () => {
    // States for questions
    let [index, setIndex] = useState(0); /* Question index state variable */
    let [question, setQuestion] = useState(questiondata[index]); /* Question data state variable */
    const [progress, setProgress] = useState(0); /* Progress bar state variable */
    const interval = 100 / questiondata.length; /* Progress bar step size */
    let navigate = useNavigate(); /* Router navigation variable */

    // References for current question answer choices
    let Option1 = useRef(null);
    let Option2 = useRef(null);
    let Option3 = useRef(null);
    let Option4 = useRef(null);

    // Sets question to previous question
    const setPrevQuestion = () => {
        // Set question index and data to previous question
        if (index - 1 >= 0) {
            setIndex(--index);
            setQuestion(questiondata[index]);
        }
        
        // Update progress bar 
        setProgress(Math.max(0, (index) * interval));
    };

    // Sets question to next question
    const setNextQuestion = () => {
        // Set question index and data to next question
        if (index + 1 < questiondata.length) {
            setIndex(++index);
            setQuestion(questiondata[index]);
        }
        else {
            // Survey is complete
            navigate("/Completion");   
        }

        // Update progress bar
        setProgress(Math.min(100, (index + 1) * interval));
    };

    return (
        <div>
            <h1> test </h1>
            <hr />
            <h2>{question.question}</h2>
            <ul>
                <li ref={Option1}>{question.option1}</li>
                <li ref={Option2}>{question.option2}</li>
                <li ref={Option3}>{question.option3}</li>
                <li ref={Option4}>{question.option4}</li>
            </ul>

            {/* Nests progress bar between the Back and Next buttons */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", width: "100%" }}>
                <button style={{ backgroundColor: "#062b50", color: "white"}} onClick={setPrevQuestion}>Back</button>
                <div style={{ flexGrow: 1 }}>
                    <ProgressBar bgcolor="#062b50" progress={progress} height={30} />
                </div>
                <button style={{ backgroundColor: "#062b50", color: "white"}} onClick={setNextQuestion}>Next</button>
            </div>
        </div>
    )
}

export default Questions;