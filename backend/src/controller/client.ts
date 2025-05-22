import { Client } from "../models/Clients";
import { User } from "../models/User";
import { Request, Response } from "express";
import mongoose from "mongoose";

interface AuthRequest extends Request {
  user?: {
    id: string;
    // add other user properties if needed
  };
}

export const addClient = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const user = await User.findOne({ id: req.params.id });
    if (!user) {
      return res.status(404).json("User not found");
    }
    const newClient = new Client({ ...req.body, user: req.params.id });
    await newClient.save();

    if (!user.clients) {
      user.clients = [];
    }
    user.clients.push(newClient._id as any);
    await user.save();
    return res
      .status(201)
      .json({ message: "Client added successfully", name: newClient.name });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};
export const getClients = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const userId = req.params.userid;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json("User not found");
    }

    return res
      .status(200)
      .json({ message: "Clients found", clients: user.clients });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};
// export const getClient = async (
//   req: Request,
//   res: Response
// ): Promise<Response | void> => {
//   try {
//     const clientId = req.params.clientId;
//     const client = await Client.findById(clientId);
//     if (!client) {
//       return res.status(404).json("Client not found");
// export const getClient = async (
//   req: AuthRequest, // beachte: AuthRequest statt nur Request
//   res: Response
// ) => {
//   const clientId = req.params.clientId;
//   const userId = req.user?.id;
// // };
export const getClient = async (
  req: AuthRequest, // use AuthRequest to access req.user
  res: Response
) => {
  const clientId = req.params.clientId;
  const userId = req.user?.id;

  if (!mongoose.Types.ObjectId.isValid(clientId)) {
    return res.status(400).json({ message: "Invalid client ID" });
  }

  const client = await Client.findOne({ _id: clientId, user: userId });

  if (!client) {
    return res
      .status(404)
      .json({ message: "Client not found or access denied" });
  }

  return res.status(200).json({ message: "Client found", client });
};
