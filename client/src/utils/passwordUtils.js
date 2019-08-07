export function checkPassword(password, repeatPassword) {
  let error = '';
  if (password !== repeatPassword) {
    error = 'Passwords must match.';
  } else if (password.length < 6 || password.length > 21) {
    error = 'Password must be between 6 and 20 characters';
  } else if (!password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/)) {
    error = 'Passwords must contain at least one number and a special character.';
  }

  if (error) {
    return error;
  }

  return false;
}
