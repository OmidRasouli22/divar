import jwt from "jsonwebtoken";

export const signToken = (payload, secretKey = null) => {
  return jwt.sign(payload, secretKey ? secretKey : process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
};
