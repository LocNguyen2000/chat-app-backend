import { Request, Response, NextFunction } from "express";
import { pool } from "../database";
import { QueryResult } from "pg";
import { addConversationAdapter, messageInterface, updateConversationMsgAdapter } from "../types/chat";

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
        .json("User haven't created conversations");

    return res.status(200).json(conversationData.rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Server error: " + error.message );
  }
};

export const addConversation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, users }: addConversationAdapter = req.body;

    const query =
      "INSERT INTO conversations (title, users, messages ) VALUES ($1, $2, $3) RETURNING *";
    const newConversation: QueryResult = await pool.query(query, [
      title,
      users,
      [],
    ]);

    return res.status(200).json("Add new conversation successful" );
  } catch (error) {
    console.log(error);
    return res.status(500).json("Server error: " + error.message );
  }
};

export const updateMessageInConversation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, content, user, createdAt }: updateConversationMsgAdapter = req.body;

    // Find messages in conversation from id
    const query = "SELECT messages FROM conversations WHERE id = $1";
    const messageData: QueryResult = await pool.query(query, [id]);

    if (messageData.rowCount === 0) return res.status(400).json("Cannot find conversation")

    // Update message in database
    const data = messageData.rows[0]
    data.messages.push({ content, user, createdAt });

    const updateQuery = " UPDATE conversations SET messages = $1 WHERE id = $2 RETURNING *"
    const updateData: QueryResult = await pool.query(updateQuery, [data.messages, id])

    // return response with updated messages
    return res.status(200).json(updateData.rows[0])

  } catch (error) {
    console.log(error);
    return res.status(500).json( "Server error: " + error.message )
  }
};
