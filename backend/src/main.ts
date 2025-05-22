import { connectDB } from "./libs/db";
import express, { Request, Response } from "express";
import authRouter from "./routes/auth";
import { authorizeJwt } from "./middelware/authorization";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userroutes";
import timeEntry from "./routes/timeEntry";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;
const clientUrl = `http://localhost:5173`;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: clientUrl,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// app.post("/api/test", (req, res) => {
//   console.log("✅ POST-Daten:", req.body);
//   res.status(200).json({
//     status: "OK",
//     received: req.body,
//   });
// });
app.use("/api/auth", authRouter);
app.use("/api/user", authorizeJwt as express.RequestHandler, userRoute);
app.use("/api/timeEntry", authorizeJwt as express.RequestHandler, timeEntry);

(async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`The server 🙈 is listening on port ${PORT}`);
    console.log(`Visit ${clientUrl} in your browser`);
  });
})();
