import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

export async function sendVoteConfirmationEmail(email: string, electionName: string) {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Vote Confirmation for ${electionName}`,
    text: `Your vote for ${electionName} has been recorded successfully.`
  });
}
