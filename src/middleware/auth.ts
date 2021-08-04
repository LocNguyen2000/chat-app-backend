import { Request, Response, NextFunction } from "express";
import config from "../config";
import jwt, { JwtPayload } from "jsonwebtoken";

export const veriryToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // find token in body or header
  const token = req.body.token || req.header("token");

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }

  try {
    const payload = jwt.verify(token, config.secretKey as string) as JwtPayload;

    next(payload)
  } catch (error) {
    console.log(error);
    return res.status(401).send("Invalid Token");
  }
};
