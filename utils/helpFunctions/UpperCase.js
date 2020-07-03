const UpCase = (value) => {
  if (typeof value !== "string") {
    throw new Error("Not String provided");
  } else {
    return value
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
};
module.exports = UpCase;
