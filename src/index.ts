import express, { Request, Response } from "express";
import cors from "cors";
import userRoutes from './routes/user'
import chatRoutes from './routes/chat'
import config from "./config";

const app = express();
const port = config.port;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/user", userRoutes);
app.use("/chat", chatRoutes)

app.get("/", async (req: Request, res: Response) => {
  res.status(200).send({
    message: "Hello World!",
  });
});

try {
  app.listen(port, (): void => {
    console.log(`Connected successfully on port ${port}`);
  });
} catch (error) {
  console.error(`Error occured: ${error.message}`);
}
