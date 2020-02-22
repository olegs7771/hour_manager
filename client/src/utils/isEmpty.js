export const isEmpty = value => {
  return (
    value === null ||
    value === false ||
    value === undefined ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};
