export const checkValidate = (email, password) => {
  // Email validation regex
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const emailValidate = emailRegex.test(email);

  // Password validation regex
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  const passwordValidate = passwordRegex.test(password);

  if (!emailValidate) return "Email is not valid";
  if (!passwordValidate) return "Password is not valid";

  return null;
};
