const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
// const mailPass = require("../../config/keys").mailPass;
const clientID = require("../../config/keys").clientID;
const clientSecret = require("../../config/keys").clientSecret;
const refresh_token = require("../../config/keys").refresh_token;
const htmlBody = require("./HTML_MAIL_BODY");

const oauth2Client = new OAuth2(
  clientID,
  clientSecret,
  "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
  refresh_token
});
const accessToken = oauth2Client.getAccessToken();

const sendMail = (data, cb) => {
  const main = async () => {
    console.log("data in mailer", data);
    //Create html body
    htmlBody(data);

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.googlemail.com",
      service: "gmail",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        type: "OAuth2",
        user: "olegs7771@gmail.com", // generated ethereal user
        clientId: clientID,
        clientSecret,
        refreshToken: refresh_token,
        accessToken
        // pass: mailPass // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"HourManager 👻" ', // sender address
      // to: "olegs7771@gmail.com ",
      to: data.email,
      subject: "Hour Manager", // Subject line
      text: "Hello world?", // plain text body
      html // html body
    });

    // console.log("Message sent: %s", info.messageId);
    return cb({ infoMessageid: info.messageId });

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  };
  main().catch(err => {
    console.log("error to send email:", err);
  });
};

module.exports = sendMail;
