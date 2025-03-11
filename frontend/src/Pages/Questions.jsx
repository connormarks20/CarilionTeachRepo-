import { useRef, useState } from "react";
import { questiondata } from "../assets/questiondata.js";
import ProgressBar from "../Components/ProgressBar.jsx";
import { useNavigate } from "react-router";
import './Questions.css';
import TeachLogo from "../assets/teachlogowhite.jpg";  

const Questions = () => {
    // Question/answer variables
    let [index, setIndex] = useState(0); /* Question index state variable */
    let [question, setQuestion] = useState(questiondata[index]); /* Question data state variable */
    let [answers, setAnswers] = useState([]);  /* Answer data stored in array */
    const [improvementAreas, setimprovementAreas] = useState([]); /* Low scoring answers stored in array */
    let [showError, setShowError] = useState(false); /* Shows an error if a user selects 'Next' without choosing an answer */

    // Progress bar variables
    const [progress, setProgress] = useState(0); /* Progress bar state variable */
    const interval = 100 / questiondata.length; /* Progress bar step size */

    // Radio button variables
    const [selectedOption, setSelectedOption] = useState('');

    // Navigation variables
    let navigate = useNavigate(); /* Router navigation variable */

    // Sets question to previous question
    const setPrevQuestion = () => {
        // Clear any show errors
        setShowError(false);

        // Set question index and data to previous question
        if (index - 1 >= 0) {
            setIndex(--index);
            setQuestion(questiondata[index]);

            // Retrieve previous answer
            setSelectedOption(answers[index]);
        }
        
        // Update progress bar 
        setProgress(Math.max(0, (index) * interval));
    };

    // Sets question to next question
    const setNextQuestion = () => {
        // Ensure user selects an answer before proceeding
        if (!selectedOption) {
            setShowError(true);
            return;
        }
        else {
            setShowError(false);
        }
        
        // If there are more questions remaining
        if (index + 1 < questiondata.length) {
            // Set question index and data to next question
            setIndex(++index);
            setQuestion(questiondata[index]);

            // Retrieve old answer if applicable, else set empty selection
            if (answers[index] != null) {
                setSelectedOption(answers[index]);
            }
            else {
                setSelectedOption(null);
            }            
        }
        else {
            // Short delay before navigating to show progress bar animation
            setTimeout(() => {
                navigate("/Completion", {state: { improvementAreas } }); 
              }, 250);
        }

        // Update progress bar
        setProgress(Math.min(100, (index + 1) * interval));
    };

    // Handles the selection of an answer
    const handleSelection = (questionIndex, option, score, category) => {
        // Set current selected option
        setSelectedOption(option);

        // Add low scoring category to weakness areas
        if (score <= 3) {
            setimprovementAreas((prevScores) => {
                // Avoid adding duplicates, and only store unique options
                if (!prevScores.includes(category)) {
                    return [...prevScores, category];
                }
                return prevScores;
            });
        }
        
        // Updates the entire answers array, adding the new answer
        setAnswers((prevAnswers) => {
            const newAnswers = [...prevAnswers];
            newAnswers[questionIndex] = option;
            return newAnswers;
        });
    }

    return (
        <div>
            {/* Horizontal bar at the top */}
            <div className="top-bar">
                <img src={TeachLogo} style={{height: "80px"}}/>
            </div>

            {/* <h1 style={{ marginTop: "20px" }}> DEMO v1 </h1>
            <hr /> */}

            {/* Adjust size and position of question text */}
            <div className="question-container">
                <h2 className="question-text">{question.question}</h2>
            </div>

            {/* Error text if user tries to go to next question without answering current question */}
            <p style={{ color: "red", fontSize: "20px", textAlign: "center"}}>
                {showError && "Please select an answer"}
            </p>

            <form style={{ marginBottom: "30px" }}>
                <div className="radio-group">
                    {/* Quiz answer options and response handling */}
                    <label 
                        className={`radio-box ${selectedOption === question.options[0].label ? "selected" : ""}`}
                        style={{ backgroundColor: "#81b5da" }}>
                        <input 
                            type="radio" 
                            name="answer" 
                            value={question.options[0].label} 
                            checked={selectedOption === question.options[0].label}
                            onChange={() => handleSelection(index, question.options[0].label, question.options[0].score, question.category)}/>
                        {question.options[0].label}
                    </label>

                    <label 
                        className={`radio-box ${selectedOption === question.options[1].label ? "selected" : ""}`}
                        style={{ backgroundColor: "#669bc4" }}>

                        <input 
                            type="radio" 
                            name="answer" 
                            value={question.options[1].label} 
                            checked={selectedOption === question.options[1].label}
                            onChange={() => handleSelection(index, question.options[1].label, question.options[1].score, question.category)}/>
                        {question.options[1].label}
                    </label>

                    <label 
                        className={`radio-box ${selectedOption === question.options[2].label ? "selected" : ""}`}
                        style={{ backgroundColor: "#477caa" }}>

                        <input 
                            type="radio" 
                            name="answer" 
                            value={question.options[2].label} 
                            checked={selectedOption === question.options[2].label}
                            onChange={() => handleSelection(index, question.options[2].label, question.options[2].score, question.category)}/>
                        {question.options[2].label}
                    </label>

                    <label 
                        className={`radio-box ${selectedOption === question.options[3].label ? "selected" : ""}`}
                        style={{ backgroundColor: "#2b6192" }}>

                        <input 
                            type="radio" 
                            name="answer" 
                            value={question.options[3].label} 
                            checked={selectedOption === question.options[3].label}
                            onChange={() => handleSelection(index, question.options[3].label, question.options[3].score, question.category)}/>
                        {question.options[3].label}
                    </label>

                    <label 
                        className={`radio-box ${selectedOption === question.options[4].label ? "selected" : ""}`}
                        style={{ backgroundColor: "#0d4379" }}>

                        <input 
                            type="radio" 
                            name="answer" 
                            value={question.options[4].label} 
                            checked={selectedOption === question.options[4].label}
                            onChange={() => handleSelection(index, question.options[4].label, question.options[4].score, question.category)}/>
                        {question.options[4].label}
                    </label>
                </div>
            </form>

            {/* Nests progress bar between the Back and Next buttons */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", width: "100%" }}> {/* TODO: prevent back and next buttons from hitting sides */}
                {/* Shows Back button if not on the first question */}
                {index > 0 ? (
                    <button style={{ backgroundColor: "#062b50", color: "white"}} onClick={setPrevQuestion}>
                        Back
                    </button>
                ) : (
                    <div style={{ width: "80px" }}></div> 
                )}

                {/* Progress bar */}
                <div style={{ flexGrow: 1 }}>
                    <ProgressBar bgcolor="#062b50" progress={progress} height={30} />
                </div>

                {/* Shows Next button if not on the last question */}
                {index + 1 < questiondata.length ? (
                   <button style={{ backgroundColor: "#062b50", color: "white"}} onClick={setNextQuestion}>Next</button>
                ) : (
                    <button style={{ backgroundColor: "#062b50", color: "white"}} onClick={setNextQuestion}>Finish</button>
                )}
            </div>
        </div>
    )
}

export default Questions;