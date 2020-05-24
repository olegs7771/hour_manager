import React from "react";

const GoogleAPI_Keys_Prod = () => {
  return {
    GOOGLE_MAP_API_KEY: process.env.GOOGLE_MAP_API_KEY,
    Geocode_ApiKey: process.env.GEOCODE_API_KEY,
  };
};
export default GoogleAPI_Keys_Prod;
