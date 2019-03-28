const { makeErrorResponse } = require('./response');

const SESSION_EXPIRED_ERROR = makeErrorResponse(-1001, 'Your session has expired');
const LOAD_USER_ERROR = makeErrorResponse(-1002, 'Could not load the user and create a session');
const UPDATE_USER_NAME_ERROR = makeErrorResponse(-1003, 'Could not update the user name');
const LOAD_ONLINE_USERS_ERROR = makeErrorResponse(-1004, 'Could not load online users list');

module.exports = {
  SESSION_EXPIRED_ERROR,
  LOAD_USER_ERROR,
  UPDATE_USER_NAME_ERROR,
  LOAD_ONLINE_USERS_ERROR
};
