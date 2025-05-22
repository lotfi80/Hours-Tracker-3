import { User } from "../models/User";
import bcrypt from "bcrypt";
import { issueJwt, verifyJwt } from "../libs/jwt";

import { Request, Response } from "express";
import { RequestHandler } from "express";

export const registerUser: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username, firstname, lastname, email, password } = req.body;

  try {
    // Überprüfen, ob der Benutzer bereits existiert
    const existUser = await User.findOne({ username: username });
    if (existUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    // Passwort hashen
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Neuen Benutzer erstellen
    const newUser = new User({
      username,
      firstname,
      lastname,
      email,
      hash: hashedPassword,
    });
    await newUser.save();
    console.log("User created:", newUser);

    // Erfolgreiche Registrierung
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Username and password are required",
    });
  }
  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const validatePassword = await bcrypt.compare(password, user.hash);
    if (!validatePassword)
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    const token = issueJwt(user);
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 3600000,
    });
    const test = verifyJwt(token);
    console.log(token);
    console.log(test);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {}
};
export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("jwt");
    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error,
    });
  }
};

export const getUser: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.find({ id: id });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json({ message: "User found", user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error });
  }
};
export const getAllUsers: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await User.find();
    if (!users) {
      res.status(404).json({ message: "No users found" });
      return;
    }
    res.status(200).json({ message: "Users found", users });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error });
  }
};

// export const login = async (req: Request, res: Response) => {
//   const { username, password } = req.body;
//   // const sha256 = createHash("sha256");
//   // const hash = sha256.update(password).digest("hex");
//   try {
//     const user = await User.findOne({ username });
//     if (!user) {
//       throw new Error("User not found");
//     }
//     const validatePassword = await bcrypt.compare(password, user.hash);
//     if (!validatePassword) {
//       throw new Error("invalid password");
//     }

//     return res.status(200).json({ message: "Login successful", user });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: "Internal server error", error: error });
//   }
// };
