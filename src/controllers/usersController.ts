import { RequestHandler, Request, Response } from "express";
import User from "../models/userModel";
import { UserObj } from "../Types";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const handleError = (res: Response, err: string) =>
  res.status(400).json({ error: err });

const createToken = (_id: string) =>
  jwt.sign({ _id }, process.env.SECRET!, { expiresIn: "3d" });

export const loginUser: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password }: UserObj = req.body;

  if (!email || !password) {
    handleError(res, "All fields required!");
    return;
  }

  const user = await User.findOne({ email });

  if (!user) {
    handleError(res, "Invalid login credentials!");
    return;
  } else {
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      handleError(res, "Invalid login credentials!");
      return;
    }

    try {
      const token = createToken(user.id);

      res.status(200).json({ email, token });
    } catch (err) {
      if (err instanceof Error) res.status(400).json({ error: err.message });
    }
  }
};

export const signupUser: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password }: UserObj = req.body;

  if (!email || !password) {
    handleError(res, "All fields required!");
    return;
  }

  if (!validator.isEmail(email)) {
    handleError(res, "Email is not valid!");
    return;
  }

  if (!validator.isStrongPassword(password)) {
    handleError(res, "Password is not strong enough!");
    return;
  }

  const exists = await User.findOne({ email });

  if (exists) {
    handleError(res, "User with that email already exists!");
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  try {
    const user = await User.create({
      email,
      password: hash,
    });
    const token = createToken(user.id);
    res.status(200).json({ email, token });
  } catch (err) {
    if (err instanceof Error) res.status(400).json({ error: err.message });
  }
};
