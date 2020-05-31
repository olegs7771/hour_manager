import React from "react";

const About = () => {
  return (
    <div className="py-3  " style={{ height: 700 }}>
      <div className="">
        <span className="text-center d-block display-4 text-white">
          About Hour Manager
        </span>
        <div className=" my-5 px-5">
          <p className="text-white">
            Hour Manager is a tool for managing staff work hours efficiently. It
            consists of two essential parts . Manager Console and Mobile App. In
            Order to start using Hourmanager the first step is to sign up .
            After obtaining confirmation from Admin You can sign in and create
            your first Project By adding new Employees to your project each
            consequential employee that was added will be noticed by e-mail and
            provided with code and further instructions in order to use Mobile
            App.
          </p>
          <span className="text-white">Please consider </span>
          <a href="/admin_contact" className="text-white ">
            contacting
          </a>{" "}
          <span className="text-white">the Admin in any issue.</span>
        </div>
      </div>
    </div>
  );
};
export default About;
