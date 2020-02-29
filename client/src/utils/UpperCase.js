export const UpCase = value => {
  if (typeof value !== "string") {
    throw new Error("Not String provided");
  } else {
    return value[0].toLocaleUpperCase() + value.slice(1);
  }
};
