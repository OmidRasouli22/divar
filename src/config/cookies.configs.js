import NodeEnv from "../common/constants/nodeEnv.js";

const cookieConfigs = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === NodeEnv.Production,
  expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export default cookieConfigs;
