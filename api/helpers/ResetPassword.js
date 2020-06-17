const Mailgen = require("mailgen");
const { intro, instructions, button, outro, subject } = require("./mailText");
const sgMail = require("@sendgrid/mail");
const secret = require("../../config/keys");
sgMail.setApiKey(secret.SENDGRID_API_KEY);

function passwordResetMail(url, token, email, name) {
  console.log(url, token)
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Mkobo",
      link: `${url}`
    }
  });
  const mail = {
    body: {
      name,
      intro: intro.second,
      action: {
        instructions: instructions.second,
        button: {
          color: button.color,
          text: button.text.second,
          link: `${url}?token=${token}`
        }
      },
      outro: outro.second
    }
  };
  const emailBody = mailGenerator.generate(mail);

  const emailText = mailGenerator.generatePlaintext(mail);

  const mailOption = {
    to: email,
    from: "Awoderuoloruntobi@gmail.com",
    subject: subject.second,
    html: emailBody,
    text: emailText
  };
  sgMail.send(mailOption);
}

module.exports = { passwordResetMail };
