const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
// const mailPass = require("../../config/keys").mailPass;
const clientID = require("../../config/keys").clientID;
const clientSecret = require("../../config/keys").clientSecret;
const refresh_token = require("../../config/keys").refresh_token;

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
    // console.log("data in mailer", data);

    //Create html body for sendMail()
    let html;
    const type = data.type;
    switch (type) {
      case "REGISTER":
        html =
          "<!DOCTYPE html>" +
          "<html><head><title>Registaration</title>" +
          "</head><body><div>" +
          '<img src="http://evokebeautysalon1.herokuapp.com/main/img/logo.png" alt="" width="160">' +
          ` <p>Dear ${data.name} Thank you for your registration on HourManager.</p>` +
          `<p> To complete registration please <a href=${data.url}>click here</a> ` +
          "<p>See You Soon.</p>";
        "</div></body></html>";
        break;

      case "NEW_EMPLOYEE_ADDED":
        html =
          "<!DOCTYPE html>" +
          "<html><head><title>New employee welcome email</title>" +
          "</head><body><div>" +
          '<img src="http://evokebeautysalon1.herokuapp.com/main/img/logo.png" alt="" width="160">' +
          `<h2>New employee welcome email</h2>` +
          `<h3 >Welcome to ${data.companyName}</h3>` +
          `</br>` +
          ` <p>Dear ${data.employeeName} We are all really excited to welcome you to our team!.</p>` +
          `<p>As agreed, your start date is ${data.started} as a ${data.func} .</p>` +
          `<p> At ${data.companyName} we use HourManager App for the  convenient and efficient workforce managment   </p>` +
          `<p> In order to use HourManager App please  <a href=${data.url}>activate</a>  your account ` +
          `<p> After successful activation you will receive confirmation as well as further instructions.</p>`;
        "<p>See You Soon.</p>";
        "</div></body></html>";
        break;

      case "ACTIVATION":
        html =
          "<!DOCTYPE html>" +
          "<html><head><title>Activation</title>" +
          "</head><body><div>" +
          '<img src="http://evokebeautysalon1.herokuapp.com/main/img/logo.png" alt="" width="160">' +
          ` <p>Dear ${data.name} The HourManager App has been activated.</p>` +
          `<p> In order to log in please use this secret code :[data.code] </p>` +
          `<p> To complete registration please <a href=[$data.url]>click here</a> ` +
          "<p>See You Soon.</p>";
        "</div></body></html>";
        break;
    }

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
