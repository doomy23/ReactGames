/**
 * Making standard JSON responses
 * Based off Google's guide:
 * https://google.github.io/styleguide/jsoncstyleguide.xml
 */

function makeSuccessResponse(data, options) {
  options = options || {};
  
  return {
    data: data,
    ...options
  };
}

function makeErrorResponse(code, message) {
  return {
    error: {
      code,
      message
    }
  };
}

module.exports = {
  makeSuccessResponse,
  makeErrorResponse,
};
