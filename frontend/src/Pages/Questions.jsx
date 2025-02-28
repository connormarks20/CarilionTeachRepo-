import { useRef, useState } from "react";
import { questiondata } from "../assets/questiondata.js";
import ProgressBar from "../Components/ProgressBar.jsx";
import { useNavigate } from "react-router";
import './Questions.css';

const Questions = () => {
    // Question/answer variables
    let [index, setIndex] = useState(0); /* Question index state variable */
    let [question, setQuestion] = useState(questiondata[index]); /* Question data state variable */
    let [answers, setAnswers] = useState([]);  /* Answer data stored in array */
    const [weaknessAreas, setWeaknessAreas] = useState([]); /* Low scoring answers stored in array */

    // Progress bar variables
    const [progress, setProgress] = useState(0); /* Progress bar state variable */
    const interval = 100 / questiondata.length; /* Progress bar step size */

    // Radio button variables
    const [selectedOption, setSelectedOption] = useState('');

    // Navigation variables
    let navigate = useNavigate(); /* Router navigation variable */

    // Sets question to previous question
    const setPrevQuestion = () => {
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
        // Set question index and data to next question
        if (index + 1 < questiondata.length) {
            setIndex(++index);
            setQuestion(questiondata[index]);

            // Retrieve old answer if applicable, else set empty selection
            if (answers[index] != null) {
                setSelectedOption(answers[index]);
            }
            else {
                setSelectedOption(null);
            }

            // Update progress bar
            setProgress(Math.min(100, (index) * interval));
            
        }
        else {
            // Survey is complete, final update to progress bar
            // console.log(weaknessAreas.toString()); Uncomment this to see the areas of weakness in console
            setProgress(Math.min(100, (index + 1) * interval));
            
            // Short delay before navigating to show progress bar animation
            setTimeout(() => {
                navigate("/Completion");  
              }, 250);
        }
    };

    // Handles the selection of an answer
    const handleSelection = (questionIndex, option, score, category) => {
        // Set current selected option
        setSelectedOption(option);

        // Add low scoring category to weakness areas
        if (score <= 3) {
            setWeaknessAreas((prevScores) => {
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
            <h1> DEMO v1 </h1>
            <hr />
            <h2>{question.question}</h2>
            <form>
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