export const checkValidate = (email, password, name) => {
  // Email validation regex
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const emailValidate = emailRegex.test(email);

  // Password validation regex
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  const passwordValidate = passwordRegex.test(password);

  //Name validation

  const nameRegex = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/;
  const nameValidate = nameRegex.test(name);

  if (!emailValidate) return "Email Id  is Invalid";
  if (!passwordValidate) return "Password is Invalid";
  if (!nameValidate) return "Name is Invalid";

  return null;
};
