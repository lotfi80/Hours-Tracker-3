import { NextFunction, Request, Response } from "express";
import { User } from "../models/User";
import { Client } from "../models/Clients";
import { TimeEntry } from "../models/TimeEntry";
import { Types } from "mongoose";

interface AuthRequest extends Request {
  user?: {
    id: string;
    // add other user properties if needed
  };
}
export const addTime = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  //   const userId = req.user?.id;
  const userId = (req as AuthRequest).user?.id;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized: No user ID" });
  }

  const clienttime = await Client.findById(req.body.client);
  const usertime = await User.findById(userId);

  if (!usertime) return res.status(404).json("User not found");
  if (!clienttime) return res.status(404).json("Client not found");

  const {
    client,
    start_time,
    end_time,
    date,
    start_break,
    end_break,
    notes,
    project,
    task,
  } = req.body;

  try {
    const newTimeEntry = new TimeEntry({
      user: userId,
      client,
      start_time,
      end_time,
      date: new Date(date),
      start_break,
      end_break,
      notes,
      project,
      task,
    });

    // Add timeEntry to user and client
    clienttime.timeEntry ||= [];
    usertime.timeEntry ||= [];

    await newTimeEntry.save();

    clienttime.timeEntry.push(newTimeEntry._id as any);
    usertime.timeEntry.push(newTimeEntry._id as any);

    await clienttime.save();
    await usertime.save();

    return res.status(201).json({
      message: "Time entry added successfully",
      timeEntry: newTimeEntry,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getTimeEntriesByClient = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const clientId = req.params.clientId;

  if (!clientId) {
    res.status(400).json({ message: "Client ID is required" });
    return;
  }
  const name = req.query.name as string;
  const start = req.query.start as string;
  const end = req.query.end as string;
  try {
    const timeEntries = await TimeEntry.find({
      client: clientId,
      clientname: name,
      date: {
        $gte: new Date(start),
        $lte: new Date(end),
      },
    }).populate("client");
    res.status(200).json(timeEntries);
    return;
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
    return;
  }
};

// export const addTime = async (
//   req: AuthRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   const userId = req.user?.id;

//   if (!userId) {
//     return res.status(401).json({ message: "Unauthorized: No user ID" });
//   }

//   const usertime = await User.findById(userId);
//   const clienttime = await Client.findById(req.body.client);
//   if (!usertime) {
//     res.status(404).send("User not found");
//     return;
//   }
//   if (!clienttime) {
//     res.status(404).send("Client not found");
//     return;
//   }
//   const { client, start_time, end_time, date, start_break, end_break, notes } =
//     req.body;
//   try {
//     const newTimeEntry = new TimeEntry({
//       user: userId,
//       client,
//       start_time,
//       end_time,
//       date: new Date(date),
//       start_break,
//       end_break,
//       notes,
//     });
//     if (!clienttime.timeEntry) {
//       clienttime.timeEntry = [];
//     }
//     if (!usertime.timeEntry) {
//       usertime.timeEntry = [];
//     }
//     await newTimeEntry.save();
//     clienttime.timeEntry.push(newTimeEntry._id as any);
//     usertime.timeEntry.push(newTimeEntry._id as any);
//     await clienttime.save();
//     await usertime.save();
//     res.status(200).json({ message: "Time Entry added successfully" });
//     return;
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//     return;
//   }
// };

// export const addTime = async (
//   req: AuthRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   const usertime = await User.findById(req.body.userId);
//   const clienttime = await Client.findById(req.body.client);
//   if (!usertime) {
//     return res.status(404).json("User not found");
//   }
//   if (!clienttime) {
//     return res.status(404).json("Client not found");
//   }
//   const {
//     userId,
//     client,
//     start_time,
//     end_time,
//     date,
//     start_break,
//     end_break,
//     notes,
//     project,
//     task,
//   } = req.body;
//   if (!userId || !client || !start_time || !end_time || !date) {
//     return res
//       .status(400)
//       .json("Required fields: userId, client, start_time, end_time, date");
//   }
//   try {
//     const newTimeEntry = new TimeEntry({
//       user: userId,
//       client,
//       start_time,
//       end_time,
//       date,
//       start_break,
//       end_break,
//       notes,
//       project,
//       task,
//     });

//     if (!clienttime.timeEntry) {
//       clienttime.timeEntry = [];
//     }
//     if (!usertime.timeEntry) {
//       usertime.timeEntry = [];
//     }
//     await newTimeEntry.save();
//     clienttime.timeEntry.push(newTimeEntry._id as any);
//     usertime.timeEntry.push(newTimeEntry._id as any);
//     await clienttime.save();
//     await usertime.save();

//     return res.status(201).json({
//       message: "Time entry added successfully",
//       timeEntry: newTimeEntry,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Internal server error");
//   }
// };
// export const addTime = async (
//   req: AuthRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     // Validate IDs first
//     if (!Types.ObjectId.isValid(req.body.userId)) {
//       return res.status(400).json("Invalid user ID format");
//     }
//     if (!Types.ObjectId.isValid(req.body.client)) {
//       return res.status(400).json("Invalid client ID format");
//     }

//     const [usertime, clienttime] = await Promise.all([
//       User.findById(req.body.userId),
//       Client.findById(req.body.client),
//     ]);

//     if (!usertime) {
//       return res.status(404).json("User not found");
//     }
//     if (!clienttime) {
//       return res.status(404).json("Client not found");
//     }

//     const {
//       userId,
//       client,
//       start_time,
//       end_time,
//       date,
//       start_break,
//       end_break,
//       notes,
//       project,
//       task,
//     } = req.body;

//     const newTimeEntry = new TimeEntry({
//       user: userId,
//       client,
//       start_time,
//       end_time,
//       date,
//       start_break,
//       end_break,
//       notes,
//       project,
//       task,
//     });

//     // Initialize arrays if they don't exist
//     clienttime.timeEntry = clienttime.timeEntry || [];
//     usertime.timeEntry = usertime.timeEntry || [];

//     await newTimeEntry.save();

//     clienttime.timeEntry.push(newTimeEntry._id as any);
//     usertime.timeEntry.push(newTimeEntry._id as any);

//     await Promise.all([clienttime.save(), usertime.save()]);

//     return res.status(201).json({
//       message: "Time entry added successfully",
//       timeEntry: newTimeEntry,
//     });
//   } catch (error) {
//     console.error("Error in addTime:", error);
//     res.status(500).send("Internal server error");
//   }
// };

// export const addTime = async (
//   req: AuthRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     // ✅ User-ID aus der Auth-Request (Token/Session) holen, NICHT aus dem Body!
//     const userId = req.user?.id;
//     if (!userId) {
//       return res.status(401).json("Unauthorized - User not authenticated");
//     }

//     // Client-ID muss noch aus dem Body kommen (falls benötigt)
//     const clientId = req.body.client?.trim();
//     if (!clientId || !Types.ObjectId.isValid(clientId)) {
//       return res.status(400).json("Invalid client ID format");
//     }

//     // Überprüfen, ob Client existiert
//     const client = await Client.findById(clientId);
//     if (!client) {
//       return res.status(404).json("Client not found");
//     }

//     // Neue Zeiterfassung erstellen
//     const newTimeEntry = new TimeEntry({
//       user: req.user?.id, // ✅ Auth-User-ID verwenden
//       client: clientId,
//       start_time: req.body.start_time,
//       end_time: req.body.end_time,
//       date: req.body.date,
//       start_break: req.body.start_break,
//       end_break: req.body.end_break,
//       notes: req.body.notes,
//       project: req.body.project,
//       task: req.body.task,
//     });

//     await newTimeEntry.save();

//     // Zeiterfassung dem User & Client zuweisen
//     await User.findByIdAndUpdate(userId, {
//       $push: { timeEntry: newTimeEntry._id },
//     });

//     await Client.findByIdAndUpdate(clientId, {
//       $push: { timeEntry: newTimeEntry._id },
//     });

//     return res.status(201).json({
//       message: "Time entry added successfully",
//       timeEntry: newTimeEntry,
//     });
//   } catch (error) {
//     console.error("Error in addTime:", error);
//     res.status(500).send("Internal server error");
//   }
// };
