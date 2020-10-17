
const loginValidator = ({ username, password }) => {
  const error = {}
  if(!username) error.username = "Username required!"
  if(!password) error.password = "Password required!"

  return { error, isValid: Object.keys(error).length === 0}
}

const signupValidator = ({ username, password, confirmPassword }) => {
  const error = {}

  if(!username) error.username = "Username required!"
  else if(username.length > 55) error.username = "Too long."

  if(!password) error.password = "Password required!"
  else if(password.length < 6) error.password = "Password must be at least 6 characters!"

  if(!confirmPassword) error.confirmPassword = "Confirm password required!"
  else if(password !== confirmPassword) error.confirmPassword = "Confirm password doesn't match!"

  return { error, isValid: Object.keys(error).length === 0}
}

module.exports = {
  loginValidator,
  signupValidator
}
