import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, email: user.email },
    process.env.ACCESS_TOKEN_SECRET_KEY,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION }
  );
};
