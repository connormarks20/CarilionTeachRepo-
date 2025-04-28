// Functional imports
import { useRef, useState } from "react";
import { useNavigate } from "react-router";

// UI imports
import Form from 'react-bootstrap/Form';
import ProgressBar from "../Components/ProgressBar.jsx";
import TeachLogo from "../assets/teachlogowhite.jpg";  

// Data imports
import { questiondata } from "../assets/questiondata.js";
import { programData } from "../assets/questiondata.js";

// CSS imports
import './Questions.css';

const Questions = () => {
    // Self assessment question/answer variables
    let [index, setIndex] = useState(0); /* Question index state variable */
    let [question, setQuestion] = useState(questiondata[index]); /* Question data state variable */
    let [answers, setAnswers] = useState([]);  /* Answer data stored in array */
    let [questionScores, setQuestionScores] = useState([]);
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
            setIndex(--index);
            setQuestion(questiondata[index]);

            // Retrieve previous answer
            setSelectedOption(answers[index]);
        }
        
        // Update progress bar 
        setProgress(Math.max(0, (index) * interval));
    };

    /**
     * Sets question to next question
     * 
     * Provides email validation and error handling
     */
    const setNextQuestion = () => {
        // Ensure user selects an answer before proceeding
        if (!selectedOption) {
            // Extra case for resident educator information validation
            if (program === "" || pgy === "" || numStudents === "" || formalEducation === "") {
                setShowError(true);
                return;
            }
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

            // Clear any errors
            setShowError(false);
        }
        else {
            // Ensure email is valid before allowing the form to complete
            if (validateEmail() == true) {
                // Email validation successful, clear any errors
                setShowError(false);
        
                // Send fetch request to backend
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
                // Email validation failed, show error
                setShowError(true);
            }
        }

        // Update progress bar
        setProgress(Math.min(100, (index + 1) * interval));
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
            
            // Build categoryScores map
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
    }

    /**
     * Updates resident's program
     * 
     * @param {*} newProgram New program to be stored
     */
    const updateProgram = (newProgram) => {
        setProgram(newProgram);
        console.log("new program " + newProgram);
    }

    /**
     * Updates resident's program year
     * 
     * @param {*} newPgy New program year to be stored
     */
    const updatePgy = (newPgy) => {
        setPgy(newPgy);
        console.log("new pgy " + newPgy);
    }

    /**
     * Updates resident's response to number of students input field
     * 
     * @param {*} newNumStudents New response string to be stored
     */
    const updateNumStudents = (newNumStudents) => {
        setNumStudents(newNumStudents);
        console.log("new num students " + newNumStudents);
    }

    /**
     * Updates resident's response to formal education input field
     * 
     * @param {*} newFormalEducation New response string to be stored
     */
    const updateFormalEducation = (newFormalEducation) => {
        setFormalEducation(newFormalEducation);
        console.log("new formal education" + newFormalEducation);
    }

    /**
     * Updates the input resident email
     * 
     * @param {*} newEmail New email to be stored
     */
    const updateEmail = (newEmail) => {
        // Update stored email
        setEmail(newEmail);

        // Store a selected option to prevent error message
        setSelectedOption(newEmail);
    }

    /**
     * Checks if email matches email format
     * 
     * @returns True if matches, false otherwise
     */
    const validateEmail = () => {
        const re = /\S+@\S+\.\S+/;
        
        // Compare strings
        return re.test(email);
    }

    return (
        <div>
            {/* Horizontal bar at the top */}
            <div className="top-bar">
                <p className="top-bar-title">Resident Educator Self-Assessment</p>
                <img src={TeachLogo} style={{height: "80px"}}/>
            </div>

            {/* Adjust size and position of question text */}
            <div className="question-container">
                <h2 className="question-text" dangerouslySetInnerHTML={{ __html: question.question }}/>
            </div>
            
            {/* If there are more questions, display them */}
            {index < questiondata.length - 2 ? (
                <>
                    {/* Error text if user tries to go to next question without answering current question */}
                    <p style={{ color: "red", fontSize: "20px", textAlign: "center"}}>
                        {showError && "Please select an answer"}
                    </p>

                    <form style={{ marginBottom: "30px" }}>
                        <div className="radio-group">
                            {/* Quiz answer options and response handling */}
                            <label 
                                className={`radio-box ${selectedOption === question.options[0].label ? "selected" : ""}`}
                                style={{ backgroundColor: "#0d4379" }}>
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
                                style={{ backgroundColor: "#2b6192" }}>

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
                                style={{ backgroundColor: "#669bc4" }}>

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
                                style={{ backgroundColor: "#81b5da" }}>

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
                </>
            ) : index == questiondata.length - 2 ? (
                <>  
                    {/* Elements for resident educator information */}

                    {/* Error text */}
                    <p style={{ color: "red", fontSize: "20px", textAlign: "center"}}>
                            {showError && "Please complete every field"}
                    </p>

                    {/* Resident program select menu */}
                    <div className="programs-wrapper">
                        <div className="programs-container">
                            <p className="program-text">Program:</p>
                            <Form style={{ flexGrow: 1 }}>
                                <Form.Select className="program-input" aria-label="Select your program" value={program} onChange={(e) => updateProgram(e.target.value)}>
                                    <option disabled value="">-Select-</option>
                                    {programData[0].program.map((item, index) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))}
                                </Form.Select>
                            </Form>
                        </div>
                    </div>
                    
                    {/* Resident PGY select menu */}
                    <div className="programs-wrapper">
                        <div className="programs-container">
                            <p className="program-text">PGY Level:</p>
                            <Form style={{ flexGrow: 1 }}>
                                <Form.Select className="program-input" aria-label="Default select example" value={pgy} onChange={(f) => updatePgy(f.target.value)}>
                                    <option disabled value="">-Select-</option>
                                    {programData[1].pgy.map((item, index) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))}
                                </Form.Select>
                            </Form>
                        </div>
                    </div>
                    
                    {/* Resident number of students input field */}
                    <Form>
                        <Form.Group className="medical-info-input">
                            <Form.Label className="medical-info-label">How many medical students are you typically responsible for teaching?</Form.Label>

                            <Form.Control
                            ref={numStudentsRef}
                            placeholder="Enter your response here"
                            aria-label="Number of student's taught"
                            aria-describedby="basic-addon2"
                            className="custom-email-input"
                            value={numStudents}
                            onChange={(g) => updateNumStudents(g.target.value)}
                            onKeyDown={(event) => {
                                // Prevent page refresh and close input field when enter is pressed
                                if (event.key === "Enter") {
                                  event.preventDefault();
                                  numStudentsRef.current.blur(); 
                                }
                              }}
                            />
                        </Form.Group>
                    </Form>
                    
                    {/* Resident formal education input field */}
                    <Form>
                        <Form.Group className="medical-info-input-2">
                            <Form.Label className="medical-info-label">Have you received any formal education related to developing your skills as a teacher?</Form.Label>
                            <Form.Control
                            ref={formalEducationRef}
                            placeholder="Enter your response here"
                            aria-label="Formal education"
                            aria-describedby="basic-addon2"
                            className="custom-email-input"
                            value={formalEducation}
                            onChange={(h) => updateFormalEducation(h.target.value)}
                            onKeyDown={(event) => {
                                // Prevent page refresh and close input field when enter is pressed
                                if (event.key === "Enter") {
                                  event.preventDefault();
                                  formalEducationRef.current.blur(); 
                                }
                              }}
                            />
                        </Form.Group>
                    </Form>
                </>
            ) : (
                <>
                    {/* End of questions, prompt for email */}
                    <p style={{ color: "red", fontSize: "20px", textAlign: "center"}}>
                            {showError && "Please input a valid email address"}
                    </p>
                    
                    {/* Resident email input field */}
                    <Form>
                        <Form.Group className="email-input" controlId="exampleForm.ControlInput1">
                            <Form.Control
                            ref={emailInputRef}
                            type="email"
                            placeholder="Enter your email here"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            className="custom-email-input"
                            onChange={(e) => updateEmail(e.target.value)}
                            onKeyDown={(event) => {
                                // Prevent page refresh and close input field when enter is pressed
                                if (event.key === "Enter") {
                                  event.preventDefault();
                                  emailInputRef.current.blur(); 
                                }
                              }}
                            />
                        </Form.Group>
                    </Form>
                </>
            )}

            {/* Nests progress bar between the Back and Next buttons */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", width: "100%" }}>
                {/* Shows Back button if not on the first question */}
                {index > 0 ? (
                    <button style={{ backgroundColor: "#062b50", color: "white", borderRadius: "6px" }} onClick={setPrevQuestion}>
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
                   <button style={{ backgroundColor: "#062b50", color: "white", borderRadius: "6px"}} onClick={setNextQuestion}>Next</button>
                ) : (
                    <button type="submit" style={{ backgroundColor: "#062b50", color: "white", borderRadius: "6px"}} onClick={setNextQuestion}>Finish</button>
                )}
            </div>
            
        </div>
    )
}


export default Questions;