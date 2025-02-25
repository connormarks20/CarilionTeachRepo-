import { useState } from "react";

// example default form just to test frontend backend interaction and UI design.  

function Form() {
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, feedback }),
    });

    const data = await response.json();
    setResponseMessage(data.message);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>Resident Feedback Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px",
            margin: "5px 0",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        <br />
        <textarea
          placeholder="Your Feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px",
            margin: "5px 0",
            border: "1px solid #ccc",
            borderRadius: "5px",
            minHeight: "100px",
          }}
        />
        <br />
        <button
          type="submit"
          style={{
            backgroundColor: "#007BFF",
            color: "white",
            padding: "10px 15px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>
      {responseMessage && <p style={{ color: "green", marginTop: "10px" }}>{responseMessage}</p>}
    </div>
  );
}

export default Form;
