import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

const verifiedToken = (token: string, secret: string) => {
  try {
    const verifiedToken = jwt.verify(token, secret);
    return {
      success: true,
      data: verifiedToken,
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const jwtUtils = {
  verifiedToken,
};
