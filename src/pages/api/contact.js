import { createTransport } from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const user = process.env.GMAIL_USER;
const password = process.env.GMAIL_PASSWORD;
export default function (req, res) {
  const transporter = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: user,
      pass: password,
    },
  });
  const { name, email, message } = req.body;
  const mailOptions = {
    from: `${name}`,
    to: user,
    subject: "New message from portfolio",
    text: `from ${name} at ${email} says: \n ${message}`,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    } else {
      console.log(info);
      res.status(200).json({ message: "Message sent" });
    }
  });
}
