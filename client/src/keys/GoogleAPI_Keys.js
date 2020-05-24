import React from "react";
import GoogleAPI_Keys_Dev from "./GoogleAPI_Keys_Dev";
import GoogleAPI_Keys_Prod from "./GoogleAPI_Keys_Prod";

const GoogleAPI_Keys = () => {
  if (process.env.NODE_ENV === "production") {
    return GoogleAPI_Keys_Prod();
  } else {
    return GoogleAPI_Keys_Dev();
  }
};
export default GoogleAPI_Keys;
