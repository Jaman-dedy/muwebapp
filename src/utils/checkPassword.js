export default password => {
  const strength = {
    case: false,
    uppercase: false,
    lowercase: false,
    digit: false,
    specialCharacter: false,
    number: false,
  };

  if (
    password.search(/[A-Z]/) !== -1 &&
    password.search(/[a-z]/) !== -1
  )
    strength.case = true;
  if (password.search(/[A-Z]/) !== -1) strength.uppercase = true;
  if (password.search(/[a-z]/) !== -1) strength.lowercase = true;
  if (password.search(/[0-9]/) !== -1) strength.digit = true;
  if (password.search(/[@!#$%^&*]/) !== -1)
    strength.specialCharacter = true;
  if (password.length > 8) strength.number = true;

  return strength;
};
