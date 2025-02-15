import { useEffect, useState } from "react";
import Form from "./Form";

function App() {
  const [backendMessage, setBackendMessage] = useState("Loading...");

  // Fetch data from the backend when the component mounts
  useEffect(() => {
    fetch("http://localhost:5000/") // Adjust the port if necessary
      .then((res) => res.text())
      .then((data) => setBackendMessage(data))
      .catch(() => setBackendMessage("Could not connect to backend"));
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Carilion TEACH</h1>
      <p style={{ fontSize: "18px", fontWeight: "bold" }}>
        Backend Response: {backendMessage}
      </p>
      <hr style={{ margin: "20px 0" }} />
      <Form />
    </div>
  );
}

export default App;
