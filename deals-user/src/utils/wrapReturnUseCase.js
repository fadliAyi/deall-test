module.exports = (success, data, message = null, httpCode = 200) => {
  return {success, data, message, httpCode};
}