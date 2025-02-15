const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Backend running");
});

// Handle form submissions
app.post("/submit", (req, res) => {
  const { name, feedback } = req.body;
  console.log(`Received feedback from ${name}: ${feedback}`);
  res.json({ message: `Thank you, ${name}! Your feedback was received.` });
});

// Start the backend server
app.listen(5000, () => console.log("Server running on port 5000"));
