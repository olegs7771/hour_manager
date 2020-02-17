const nodemailer = require("nodemailer");
const mailPass = require("../../config/keys").mailPass;

const sendMail = (data, cb) => {
  const main = async () => {
    console.log("data in mailer", data);

    //Create html body for sendMail()
    let html;
    const type = data.type;
    switch (type) {
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
          `<p>As agreed, your start date is ${data.employeeStartedJob}.</p>` +
          `<p> At ${data.companyName} we use HourManager App for the  convenient and efficient workforce managment   </p>` +
          `<p> In order to use HourManager App please  <a href=${data.url}>activate</a>  your account ` +
          `<p> After successful activation you will receive confirmation as well as further instructions.</p>`;
        "<p>See You Soon.</p>";
        "</div></body></html>";
        break;
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
    }

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.googlemail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "olegs7771", // generated ethereal user
        pass: "maspena0503054422" // generated ethereal password
      }
      // tls: {
      //   rejectUnauthorized: false
      // }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"HourManager 👻" ', // sender address
      to: "olegs7771@gmail.com ",
      subject: "Hour Manager", // Subject line
      text: "Hello world?", // plain text body
      html // html body
    });

    // console.log("Message sent: %s", info.messageId);
    return cb({ infoMessageid: info.messageId });

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  };
  main().catch(console.error);
};

module.exports = sendMail;
