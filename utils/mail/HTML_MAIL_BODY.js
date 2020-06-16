const htmlBody = (data) => {
  const { type } = data;
  let html;

  switch (type) {
    case "REGISTER":
      html =
        "<!DOCTYPE html>" +
        "<html><head><title>Registaration</title>" +
        "</head><body><div>" +
        '<img src="https://hourmanager1.s3.us-east-1.amazonaws.com/hourmanagerLogo.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCWV1LXdlc3QtMyJHMEUCIEhKgX0zmBmInQV0ucBbBTldcew4ZVP88yXRHzevNteLAiEAjTFi%2B2%2FVqzdlSTTben5BuWN1HtC4Ixm3MY0xco59FFUq5gEIMhAAGgw3OTQ3NjU3NDcyODYiDEyKlLMYIa32VMnfLSrDAXxXsbVevz5Aw4vhvnJWGY27l388JNQ3vASOfaetYlioPlHHusz4OUSG7KibGvM9S4QZY2gjILZyR3x386%2BlCWfb87fnIwWwlKBzuaQol0QChHa9%2FavaoyJIqTm2oMQnL3LKIuNpie6mjxj4C%2FvtCyC6ria0pR0XP1iPFtzwxFi2ILDAaexwBRPg52NmRln67LbM8i6SFstcSGV8aexZy6G9zLDZZ5eZ3V1awm54VjPQI0qiK5wRxvHRik5gjskNH%2FU8RjC7rrH1BTrwAiL%2F2USaEO5BkS48ieuHVdfHG3deNQ3nz3a8%2F8C39PQVBxcdM4OQ%2B20j4bPiVW5YNE5cEZZbhDpfvThrjOmx3xjwrwo00YAsZW4xLX6%2Bp2TKy92KeF8mdUCvDBapsc9Ti5uklQg0S8ZU8xnHBP6mq0mMtXb7pRat7XszXOl6wkNgdq92sNLKTlimvRJsPUb%2FcXbgkROvAfC8Tm1XxMffO%2BLTgRxW1lSFDH8G0u%2BiALMtV6tCxwXiUuqpezEL4Gfq593qSaKD5siAYyqk8iQ%2FuuDRfp0MsbMoOAuYm3G1z0j%2FijuCauS0QICdO5K5EM%2FJYiSmwHxUCgSQ6W5Tdc6hta8hi6WpF8Qo4m%2BVn0vJQPPZUTPwDmw1WTX4VbDpsSMci3E5tTpZybagmhP73j9INf0t1sk1lmpWF7314hExR3uUafYd%2BtQQkCMgWmDe1N235yXXncYG9lf6DuhsF0e9QIQTwqWzEsPiF0yfQtsGb7%2BR&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20200501T203641Z&X-Amz-SignedHeaders=host&X-Amz-Expires=299&X-Amz-Credential=ASIA3SC524RLCEC42BPY%2F20200501%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=60e979b65881e2fb7f11c68cfd0283f19c086af7537d570ec7067ff635919809" alt="" width="250">' +
        ` <p>Dear` +
        " " +
        ` ${data.name} Thank you for your registration on HourManager.</p>` +
        `<p> To complete registration please <a href=${data.url}>click here</a> ` +
        `This link will be valid for 12 hours` +
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
        ` <p>Name : ${
          data.uname[0].toLocaleUpperCase() + data.uname.slice(1)
        } .</p>` +
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
        ` <span>Dear ${
          data.uname[0].toLocaleUpperCase() + data.uname.slice(1)
        } .</span>` +
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
        '<img src="https://hourmanager1.s3.us-east-1.amazonaws.com/hourmanagerLogo.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCWV1LXdlc3QtMyJHMEUCIEhKgX0zmBmInQV0ucBbBTldcew4ZVP88yXRHzevNteLAiEAjTFi%2B2%2FVqzdlSTTben5BuWN1HtC4Ixm3MY0xco59FFUq5gEIMhAAGgw3OTQ3NjU3NDcyODYiDEyKlLMYIa32VMnfLSrDAXxXsbVevz5Aw4vhvnJWGY27l388JNQ3vASOfaetYlioPlHHusz4OUSG7KibGvM9S4QZY2gjILZyR3x386%2BlCWfb87fnIwWwlKBzuaQol0QChHa9%2FavaoyJIqTm2oMQnL3LKIuNpie6mjxj4C%2FvtCyC6ria0pR0XP1iPFtzwxFi2ILDAaexwBRPg52NmRln67LbM8i6SFstcSGV8aexZy6G9zLDZZ5eZ3V1awm54VjPQI0qiK5wRxvHRik5gjskNH%2FU8RjC7rrH1BTrwAiL%2F2USaEO5BkS48ieuHVdfHG3deNQ3nz3a8%2F8C39PQVBxcdM4OQ%2B20j4bPiVW5YNE5cEZZbhDpfvThrjOmx3xjwrwo00YAsZW4xLX6%2Bp2TKy92KeF8mdUCvDBapsc9Ti5uklQg0S8ZU8xnHBP6mq0mMtXb7pRat7XszXOl6wkNgdq92sNLKTlimvRJsPUb%2FcXbgkROvAfC8Tm1XxMffO%2BLTgRxW1lSFDH8G0u%2BiALMtV6tCxwXiUuqpezEL4Gfq593qSaKD5siAYyqk8iQ%2FuuDRfp0MsbMoOAuYm3G1z0j%2FijuCauS0QICdO5K5EM%2FJYiSmwHxUCgSQ6W5Tdc6hta8hi6WpF8Qo4m%2BVn0vJQPPZUTPwDmw1WTX4VbDpsSMci3E5tTpZybagmhP73j9INf0t1sk1lmpWF7314hExR3uUafYd%2BtQQkCMgWmDe1N235yXXncYG9lf6DuhsF0e9QIQTwqWzEsPiF0yfQtsGb7%2BR&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20200501T203641Z&X-Amz-SignedHeaders=host&X-Amz-Expires=299&X-Amz-Credential=ASIA3SC524RLCEC42BPY%2F20200501%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=60e979b65881e2fb7f11c68cfd0283f19c086af7537d570ec7067ff635919809" alt="" width="250">' +
        `<h2>New employee welcome email</h2>` +
        `<h3 >Welcome to ${data.companyName}</h3>` +
        `</br>` +
        ` <p>Dear ${
          data.employeeName[0].toLocaleUpperCase() + data.employeeName.slice(1)
        } We are all really excited to welcome you to our team!.</p>` +
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
        '<img src="https://hourmanager1.s3.us-east-1.amazonaws.com/hourmanagerLogo.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCWV1LXdlc3QtMyJHMEUCIEhKgX0zmBmInQV0ucBbBTldcew4ZVP88yXRHzevNteLAiEAjTFi%2B2%2FVqzdlSTTben5BuWN1HtC4Ixm3MY0xco59FFUq5gEIMhAAGgw3OTQ3NjU3NDcyODYiDEyKlLMYIa32VMnfLSrDAXxXsbVevz5Aw4vhvnJWGY27l388JNQ3vASOfaetYlioPlHHusz4OUSG7KibGvM9S4QZY2gjILZyR3x386%2BlCWfb87fnIwWwlKBzuaQol0QChHa9%2FavaoyJIqTm2oMQnL3LKIuNpie6mjxj4C%2FvtCyC6ria0pR0XP1iPFtzwxFi2ILDAaexwBRPg52NmRln67LbM8i6SFstcSGV8aexZy6G9zLDZZ5eZ3V1awm54VjPQI0qiK5wRxvHRik5gjskNH%2FU8RjC7rrH1BTrwAiL%2F2USaEO5BkS48ieuHVdfHG3deNQ3nz3a8%2F8C39PQVBxcdM4OQ%2B20j4bPiVW5YNE5cEZZbhDpfvThrjOmx3xjwrwo00YAsZW4xLX6%2Bp2TKy92KeF8mdUCvDBapsc9Ti5uklQg0S8ZU8xnHBP6mq0mMtXb7pRat7XszXOl6wkNgdq92sNLKTlimvRJsPUb%2FcXbgkROvAfC8Tm1XxMffO%2BLTgRxW1lSFDH8G0u%2BiALMtV6tCxwXiUuqpezEL4Gfq593qSaKD5siAYyqk8iQ%2FuuDRfp0MsbMoOAuYm3G1z0j%2FijuCauS0QICdO5K5EM%2FJYiSmwHxUCgSQ6W5Tdc6hta8hi6WpF8Qo4m%2BVn0vJQPPZUTPwDmw1WTX4VbDpsSMci3E5tTpZybagmhP73j9INf0t1sk1lmpWF7314hExR3uUafYd%2BtQQkCMgWmDe1N235yXXncYG9lf6DuhsF0e9QIQTwqWzEsPiF0yfQtsGb7%2BR&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20200501T203641Z&X-Amz-SignedHeaders=host&X-Amz-Expires=299&X-Amz-Credential=ASIA3SC524RLCEC42BPY%2F20200501%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=60e979b65881e2fb7f11c68cfd0283f19c086af7537d570ec7067ff635919809" alt="" width="250">' +
        ` <p>Dear ${data.name}. The HourManager App has been activated.</p>` +
        ` <p>Please download HourManager app and login with your Email ${data.email}  and secret code :${data.code} </p>` +
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
