import express from "express";
import cors from "cors";
import config from "./config";
import userRoutes from './routes/user'
import chatRoutes from './routes/chat'

const app = express();
const port = config.port;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// all routes
app.use("/user", userRoutes);
app.use("/chat", chatRoutes)

app.listen(port, () => {
  console.log(`Connected successfully on port ${port}`);
});

