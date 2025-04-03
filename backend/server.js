const express = require("express");
const cors = require("cors");
require("dotenv").config();
const nodemailer = require("nodemailer");
const app = express();

app.use(cors());
app.use(express.json());



app.post("/send-email", async (req, res) => {
  const { email, improvementAreas } = req.body;

  const transporter = nodemailer.createTransport({
    service: "Gmail", 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Carilion Teach Survey" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Thank You for Completing the Resident Educator Skills Self-Assessment",
    text: 
 `Thank you for taking the time to complete the Resident Educator Skills Self-Assessment. 
  Your reflection on your teaching abilities is an important step in your growth as a clinician-educator.\n
  
  Based on your responses, you have identified the following areas of opportunity for further development:
  
  -${improvementAreas.join('\n- ')}
  
  Use the link below to access targeted resources related to these areas.
  
  If you would like to discuss your results, please don’t hesitate to reach out to TEACH at teach@carilionclinic.org.
  
  Thank you for your commitment to medical education and for shaping the learning experiences of your peers and learners.`
  };
  

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }

});
// starts backend server. 
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));

