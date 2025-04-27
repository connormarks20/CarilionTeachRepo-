// Functional imports
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; // Use react-router-dom
import Form from 'react-bootstrap/Form';
import ProgressBar from "../Components/ProgressBar.jsx";
import TeachLogo from "../assets/teachlogowhite.jpg";  

// Data imports
import { questiondata, programData } from "../assets/questiondata.js"; 

// CSS imports
import './Questions.css';

const Questions = () => {
    // Self-assessment question/answer variables
    let [index, setIndex] = useState(0); /* Question index state variable */
    let [question, setQuestion] = useState(questiondata[0]); /* Question data state variable */
    let [answers, setAnswers] = useState([]);  /* Answer data stored in array */
    let [questionScores, setQuestionScores] = useState([]); /* Array to store scores for each question */
    const [improvementAreas, setImprovementAreas] = useState([]); /* Low scoring answers stored in array */
    let [showError, setShowError] = useState(false); /* Shows an error if a user selects 'Next' without choosing an answer */
    
    // Resident educator information variables
    let [program, setProgram] = useState("");
    let [pgy, setPgy] = useState("");
    let [numStudents, setNumStudents] = useState("");
    const numStudentsRef = useRef(null);
    let [formalEducation, setFormalEducation] = useState("");
    const formalEducationRef = useRef(null);

    // Email variables
    let [email, setEmail] = useState("");
    const emailInputRef = useRef(null);

    // Progress bar variables
    const [progress, setProgress] = useState(0); /* Progress bar state variable */
    const interval = 100 / questiondata.length; /* Progress bar step size */

    // Radio button variables
    const [selectedOption, setSelectedOption] = useState('');

    // Navigation variables
    let navigate = useNavigate(); /* Router navigation variable */

    /**
     * Sets question to previous question
     */
    const setPrevQuestion = () => {
        // Clear any show errors
        setShowError(false);

        // Set question index and data to previous question
        if (index - 1 >= 0) {
            setIndex(index - 1);
            setQuestion(questiondata[index - 1]);

            // Retrieve previous answer
            setSelectedOption(answers[index - 1]);
        }
        
        // Update progress bar 
        setProgress(Math.max(0, (index - 1) * interval));
    };

    /**
     * Checks if email matches email format
     * 
     * @returns True if matches, false otherwise
     */
    const validateEmail = () => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    /**
     * Sets question to next question
     * 
     * Provides email validation and error handling
     */
    const setNextQuestion = () => {
        // Validation depending on the page
        if (index === questiondata.length - 2) {
            // Resident information page
            if (!program || !pgy || !numStudents || !formalEducation) {
                setShowError(true);
                return;
            }
        } else if (index === questiondata.length - 1) {
            // Email input page
            if (!validateEmail()) {
                setShowError(true);
                return;
            }
        } else {
            // Regular question page
            if (!selectedOption) {
                setShowError(true);
                return;
            }
        }

        setShowError(false);

        // If finished answering all questions
        if (index + 1 === questiondata.length) {
            // send fetch request to backend 
            fetch(`${import.meta.env.VITE_API_BASE_URL}/send-email`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    improvementAreas,
                    program,
                    pgy,
                    numStudents,
                    formalEducation
                }),
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to send email");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Email sent:", data.message);

                // Go to completion page 
                setTimeout(() => {
                    navigate("/Completion", { state: { improvementAreas } });
                }, 250);
            })
            .catch((error) => {
                console.error("Error sending email:", error);
                alert("There was a problem sending your email. Please try again.");
            });
        } else {
            // Otherwise, move to next question
            setIndex(index + 1);
            setQuestion(questiondata[index + 1]);
            setSelectedOption(answers[index + 1] || null);

            // Update progress bar
            setProgress(Math.min(100, (index + 1) * interval));
        }
    };

    /**
     * Handles the selection of an answer to the self-assessment questions
     * 
     * @param {*} questionIndex Index of the current question
     * @param {*} option Currently selected answer to question
     * @param {*} score Score related to selected option
     * @param {*} category Category of question
     */
    const handleSelection = (questionIndex, option, score, category) => {
        // Set current selected option
        setSelectedOption(option);

        // Update weakness areas in accordance to resident responses
        setQuestionScores((prevScores) => {
            // Copy scores array
            const newScores = [...prevScores];
            newScores[questionIndex] = { score, category };

            // Recalculate improvementAreas from updated scores
            const categoryScores = {};
            newScores.forEach(({ score, category }) => {
                if (!categoryScores[category]) categoryScores[category] = [];
                categoryScores[category].push(score);
            });

            // Extract low scores
            const updatedImprovementAreas = Object.entries(categoryScores)
                .filter(([_, scores]) => scores.some((s) => s <= 3))
                .map(([cat]) => cat);

            // Set low scores as areas of improvement
            setImprovementAreas(updatedImprovementAreas);

            return newScores;
        });

        // Updates the entire answers array, adding the new answer
        setAnswers((prevAnswers) => {
            const newAnswers = [...prevAnswers];
            newAnswers[questionIndex] = option;
            return newAnswers;
        });
    };

    /**
     * Updates the input resident program
     */
    const updateProgram = (newProgram) => setProgram(newProgram);

    /**
     * Updates the input resident PGY
     */
    const updatePgy = (newPgy) => setPgy(newPgy);

    /**
     * Updates the input number of students taught
     */
    const updateNumStudents = (newNumStudents) => setNumStudents(newNumStudents);

    /**
     * Updates the input formal education response
     */
    const updateFormalEducation = (newFormalEducation) => setFormalEducation(newFormalEducation);

    /**
     * Updates the input resident email
     */
    const updateEmail = (newEmail) => setEmail(newEmail);

    return (
        <div>
            {/* Horizontal bar at the top */}
            <div className="top-bar">
                <p className="top-bar-title">Resident Educator Self-Assessment</p>
                <img src={TeachLogo} alt="Teach Logo" style={{ height: "80px" }} />
            </div>

            {/* Adjust size and position of question text */}
            <div className="question-container">
                <h2 className="question-text" dangerouslySetInnerHTML={{ __html: question.question }} />
            </div>

            {/* Display different screens based on question index */}
            {index < questiondata.length - 2 ? (
                <>
                    {/* Display radio options */}
                    {showError && <p style={{ color: "red", textAlign: "center" }}>Please select an answer</p>}
                    <form style={{ marginBottom: "30px" }}>
                        <div className="radio-group">
                            {question.options.map((opt, i) => (
                                <label key={i} className={`radio-box ${selectedOption === opt.label ? "selected" : ""}`}
                                    style={{ backgroundColor: ["#0d4379", "#2b6192", "#477caa", "#669bc4", "#81b5da"][i] }}>
                                    <input
                                        type="radio"
                                        name="answer"
                                        value={opt.label}
                                        checked={selectedOption === opt.label}
                                        onChange={() => handleSelection(index, opt.label, opt.score, question.category)}
                                    />
                                    {opt.label}
                                </label>
                            ))}
                        </div>
                    </form>
                </>
            ) : index === questiondata.length - 2 ? (
                <>
                    {/* Resident information input fields */}
                    {showError && <p style={{ color: "red", textAlign: "center" }}>Please complete every field</p>}
                    <div className="programs-wrapper">
                        {/* Program Select */}
                        <div className="programs-container">
                            <p className="program-text">Program:</p>
                            <Form.Select value={program} onChange={(e) => updateProgram(e.target.value)}>
                                <option disabled value="">-Select-</option>
                                {programData[0].program.map((item, i) => (
                                    <option key={i} value={item}>{item}</option>
                                ))}
                            </Form.Select>
                        </div>

                        {/* PGY Select */}
                        <div className="programs-container">
                            <p className="program-text">PGY Level:</p>
                            <Form.Select value={pgy} onChange={(e) => updatePgy(e.target.value)}>
                                <option disabled value="">-Select-</option>
                                {programData[1].pgy.map((item, i) => (
                                    <option key={i} value={item}>{item}</option>
                                ))}
                            </Form.Select>
                        </div>

                        {/* Number of Students Input */}
                        <Form.Group className="medical-info-input">
                            <Form.Label>How many medical students are you typically responsible for teaching?</Form.Label>
                            <Form.Control
                                ref={numStudentsRef}
                                placeholder="Enter your response"
                                value={numStudents}
                                onChange={(e) => updateNumStudents(e.target.value)}
                            />
                        </Form.Group>

                        {/* Formal Education Input */}
                        <Form.Group className="medical-info-input-2">
                            <Form.Label>Have you received any formal education related to teaching?</Form.Label>
                            <Form.Control
                                ref={formalEducationRef}
                                placeholder="Enter your response"
                                value={formalEducation}
                                onChange={(e) => updateFormalEducation(e.target.value)}
                            />
                        </Form.Group>
                    </div>
                </>
            ) : (
                <>
                    {/* Email input field */}
                    {showError && <p style={{ color: "red", textAlign: "center" }}>Please input a valid email address</p>}
                    <Form.Group className="email-input">
                        <Form.Control
                            ref={emailInputRef}
                            type="email"
                            placeholder="Enter your email here"
                            value={email}
                            onChange={(e) => updateEmail(e.target.value)}
                        />
                    </Form.Group>
                </>
            )}

            {/* Progress bar and navigation buttons */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", width: "100%" }}>
                {index > 0 ? (
                    <button style={{ backgroundColor: "#062b50", color: "white" }} onClick={setPrevQuestion}>Back</button>
                ) : <div style={{ width: "80px" }}></div>}

                <div style={{ flexGrow: 1 }}>
                    <ProgressBar bgcolor="#062b50" progress={progress} height={30} />
                </div>

                <button style={{ backgroundColor: "#062b50", color: "white" }} onClick={setNextQuestion}>
                    {index + 1 < questiondata.length ? "Next" : "Finish"}
                </button>
            </div>
        </div>
    );
}

export default Questions;
