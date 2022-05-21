const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;
const AUTHORITY = process.env.NEXT_PUBLIC_AUTHORITY as string;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID as string;
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI as string;
const RESPONSE_TYPE = process.env.NEXT_PUBLIC_RESPONSE_TYPE as string;
const SCOPE = process.env.NEXT_PUBLIC_SCOPE as string;

const POST_LOGOUT_REDIRECT_URI = process.env
  .NEXT_PUBLIC_POST_LOGOUT_REDIRECT_URI as string;

const SILENT_REDIRECT_URI = process.env
  .NEXT_PUBLIC_SILENT_REDIRECT_URI as string;

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
