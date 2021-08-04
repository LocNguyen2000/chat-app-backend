import { Request, Response, NextFunction } from "express";
import { pool } from "../database";
import { QueryResult } from "pg";
import { messageInterface } from "../types/chat";

export const getConversationsByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;

    const query = "SELECT * FROM conversations WHERE $1 = ANY(users)";
    const conversationData: QueryResult = await pool.query(query, [email]);

    if (conversationData.rowCount === 0)
      return res
        .status(400)
        .json({ message: "User haven't created conversations" });

    console.log(conversationData.rows);

    return res.status(200).json({ data: conversationData.rows });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error: " + error.message });
  }
};

export const addConversation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, users } = req.body;

    const query =
      "INSERT INTO conversations (title, users, messages ) VALUES ($1, $2, $3) RETURNING *";
    const newConversation: QueryResult = await pool.query(query, [
      title,
      users,
      [],
    ]);

    console.log(newConversation.rows);

    return res.status(200).json({ message: "Add new conversation successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error: " + error.message });
  }
};

export const updateMessageInConversation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { content, users, createdAt } = req.body;
};
