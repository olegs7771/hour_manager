if (process.env.NODE_ENV === "production") {
  module.exports = require("./configureStoreProd");
  // console.log("production");
} else {
  module.exports = require("./configureStoreDev");
  // console.log("development");

  // console.log("process.env.NODE_ENV", process.env.NODE_ENV);
}
