const { makeErrorResponse } = require('./response');

const SESSION_EXPIRED_ERROR = makeErrorResponse(-1001, 'Your session has expired');
const USER_UUID_CREATE_ERROR = makeErrorResponse(-1002, 'Could not create user uuid');

module.exports = {
  SESSION_EXPIRED_ERROR,
  USER_UUID_CREATE_ERROR,
};
