export const concatLogArgs = (...args) => {
  let message = "";
  args = args[0];
  Object.keys(args).forEach((key) => {
    message +=
      typeof args[key] === "object" ? JSON.stringify(args[key]) : args[key];
    message += " ";
  });
  return message;
};
