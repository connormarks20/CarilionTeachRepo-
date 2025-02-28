import { useRef, useState } from "react";
import { questiondata } from "../assets/questiondata.js";
import ProgressBar from "../Components/ProgressBar.jsx";
import { useNavigate } from "react-router";
import './Questions.css';

const Questions = () => {
    // States for questions
    let [index, setIndex] = useState(0); /* Question index state variable */
    let [question, setQuestion] = useState(questiondata[index]); /* Question data state variable */

    // Progress bar variables
    const [progress, setProgress] = useState(0); /* Progress bar state variable */
    const interval = 100 / questiondata.length; /* Progress bar step size */

    // Radio button variables
    const [selectedOption, setSelectedOption] = useState('');

    // Navigation variables
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
            <form>
            <div className="radio-group">
                <label 
                    className={`radio-box ${selectedOption === question.option1 ? "selected" : ""}`}
                    style={{ backgroundColor: "#81b5da" }}>
                    <input 
                        type="radio" 
                        name="answer" 
                        value={question.option1} 
                        checked={selectedOption === question.option1}
                        onChange={() => setSelectedOption(question.option1)}/>
                    {question.option1}
                </label>

                <label 
                    className={`radio-box ${selectedOption === question.option2 ? "selected" : ""}`}
                    style={{ backgroundColor: "#669bc4" }}>

                    <input 
                        type="radio" 
                        name="answer" 
                        value={question.option2} 
                        checked={selectedOption === question.option2}
                        onChange={() => setSelectedOption(question.option2)}/>
                    {question.option2}
                </label>

                <label 
                    className={`radio-box ${selectedOption === question.option3 ? "selected" : ""}`}
                    style={{ backgroundColor: "#477caa" }}>

                    <input 
                        type="radio" 
                        name="answer" 
                        value={question.option3} 
                        checked={selectedOption === question.option3}
                        onChange={() => setSelectedOption(question.option3)}/>
                    {question.option3}
                </label>

                <label 
                    className={`radio-box ${selectedOption === question.option4 ? "selected" : ""}`}
                    style={{ backgroundColor: "#2b6192" }}>

                    <input 
                        type="radio" 
                        name="answer" 
                        value={question.option4} 
                        checked={selectedOption === question.option4}
                        onChange={() => setSelectedOption(question.option4)}/>
                    {question.option4}
                </label>

                <label 
                    className={`radio-box ${selectedOption === question.option5 ? "selected" : ""}`}
                    style={{ backgroundColor: "#0d4379" }}>

                    <input 
                        type="radio" 
                        name="answer" 
                        value={question.option5} 
                        checked={selectedOption === question.option5}
                        onChange={() => setSelectedOption(question.option5)}/>
                    {question.option5}
                </label>
            </div>
        </form>

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