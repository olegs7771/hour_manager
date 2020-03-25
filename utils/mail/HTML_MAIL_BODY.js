const htmlBody = data => {
  const { type } = data;
  let html;

  switch (type) {
    case "REGISTER":
      html =
        "<!DOCTYPE html>" +
        "<html><head><title>Registaration</title>" +
        "</head><body><div>" +
        '<img src="http://evokebeautysalon1.herokuapp.com/main/img/logo.png" alt="" width="160">' +
        ` <p>Dear` +
        " " +
        ` ${data.name} Thank you for your registration on HourManager.</p>` +
        `<p> To complete registration please <a href=${data.url}>click here</a> ` +
        "<p>See You Soon.</p>";
      "</div></body></html>";
      break;

    case "ADMIN":
      html =
        "<!DOCTYPE html>" +
        "<html><head><title>Notification</title>" +
        "</head><body><div>" +
        "<h3>New User have been registered as temp user :</h3>" +
        `</br>` +
        ` <p>Name : ${data.uname[0].toLocaleUpperCase() +
          data.uname.slice(1)} .</p>` +
        `</br>` +
        ` <p>Email : ${data.uemail} .</p>` +
        `</br>` +
        ` <p>Phone: ${data.uphone} .</p>` +
        `</br>` +
        ` <p>Location : ${data.uaddress} .</p>` +
        `</br>` +
        ` <p>Date : ${data.udate} .</p>` +
        `</br>` +
        `<a href=${data.URL_Approve_ACCESS}><h2>Approve</h2</a> ` +
        "</div></body></html>";
      break;

    case "PERMISSION":
      html =
        "<!DOCTYPE html>" +
        "<html><head><title>Notification</title>" +
        "</head><body><div>" +
        "<h3>Admin Permission has been Granted.</h3>" +
        `</br>` +
        ` <span>Dear ${data.uname[0].toLocaleUpperCase() +
          data.uname.slice(1)} .</span>` +
        ` ` +
        `We are pleased to inform you as from now you can ` +
        `<a href=${data.url}>Login</a> 
      and use HourManager.` +
        `</br> ` +
        `Happy to see You soon!` +
        `</br>` +
        `<h3>Admin</h3>`;
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
        ` <p>Dear ${data.employeeName[0].toLocaleUpperCase() +
          data.employeeName.slice(
            1
          )} We are all really excited to welcome you to our team!.</p>` +
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
    case "CONTACT_ADMIN":
      html =
        "<!DOCTYPE html>" +
        "<html><head><title>Message</title>" +
        "</head><body><div>" +
        `   ${data.uname[0].toLocaleUpperCase() + data.uname.slice(1)}` +
        ` ` +
        `sent message.` +
        `<p> ${data.text}</p>` +
        `<b>Email : ${data.uemail}`;
      "</div></body></html>";
      break;
  }

  return html;
};

module.exports = htmlBody;