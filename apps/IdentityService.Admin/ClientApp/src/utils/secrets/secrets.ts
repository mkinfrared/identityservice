const BASE_URL = process.env.REACT_APP_BASE_URL as string;
const AUTHORITY = process.env.REACT_APP_AUTHORITY as string;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID as string;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI as string;
const RESPONSE_TYPE = process.env.REACT_APP_RESPONSE_TYPE as string;
const SCOPE = process.env.REACT_APP_SCOPE as string;

const POST_LOGOUT_REDIRECT_URI = process.env
  .REACT_APP_POST_LOGOUT_REDIRECT_URI as string;

const SILENT_REDIRECT_URI = process.env.REACT_APP_SILENT_REDIRECT_URI as string;

export {
  BASE_URL,
  AUTHORITY,
  CLIENT_ID,
  REDIRECT_URI,
  RESPONSE_TYPE,
  SCOPE,
  POST_LOGOUT_REDIRECT_URI,
  SILENT_REDIRECT_URI,
};
