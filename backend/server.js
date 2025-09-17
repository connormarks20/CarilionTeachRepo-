const express = require("express");
const cors = require("cors");
require("dotenv").config();
const nodemailer = require("nodemailer");
const { ConfidentialClientApplication } = require("@azure/msal-node")
/* https://techcommunity.microsoft.com/discussions/outlookgeneral/how-to-send-emails-thru-nodemailer-node-js-from-outlook-smtp-disabled/3918939 */

const app = express();
const config = {
  auth:{
    clientId: process.env.CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.SECRET_ID}`,
    clientSecret: process.env.SECRET,
  }
};
const cca = new ConfidentialClientApplication(config);
const getAccessToken = async () => {
  const result = await cca.acquireTokenByClientCredential({
    scopes: ['https://outlook.office365.com/.default'],
  });
  return result.accessToken;
};

app.use(cors());
app.use(express.json());

// Create a router for email endpoints 
const router = express.Router();

router.post("/send-email", async (req, res) => {
  const { email, improvementAreas } = req.body;
  const accessToken = await getAccessToken();

  const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL_ADDRESS,
      accessToken: accessToken,
    },
  });

  const mailOptions = {
    from: `"Carilion Teach Survey" <${process.env.EMAIL_ADDRESS}>`,
    to: email,
    subject: "Thank You for Completing the Resident Educator Skills Self-Assessment",
    text: 
`Thank you for taking the time to complete the Resident Educator Skills Self-Assessment. 
Your reflection on your teaching abilities is an important step in your growth as a clinician-educator.

Based on your responses, you have identified the following areas of opportunity for further development:

-${improvementAreas.join('\n- ')}

Please visit the ’Health Professions Education Resources’ portion of our site (${process.env.FRONTEND_URL}) for targeted resources related to these areas.

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

app.use("/api", router);

// Start backend server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));
