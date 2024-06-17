import express from "express";
import logger from "morgan";
import cors from "cors";
import { router as contactsRouter } from "./routes/api/contactsRouter.js";
import { router as usersRouter } from "./routes/api/usersRouter.js";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// tells Express to serve static files from the public directory 
//open http://localhost:3006/avatars/66623b69e63f68be3687ec57.jpeg on browser
app.use(express.static("public"));

app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

app.use((_req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, _req, res, _next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export { app };
