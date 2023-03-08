import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel";

export const requireAuth: RequestHandler = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({ error: "Authorization token required" });
    return;
  }

  try {
    const authorizationToken = authorization.split(" ")[1];

    const token = jwt.verify(authorizationToken, process.env.SECRET!);

    if (typeof token == "string") {
      throw Error("Request is not authorized");
    }

    const user = await User.findOne({ _id: token._id }).select("_id");

    req.user = user?.id;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: "Request is not authorized" });
  }
};
