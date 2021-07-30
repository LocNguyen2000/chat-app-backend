import { Request, Response } from "express";
import { pool } from "../database";
import { QueryResult } from "pg";

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const query = "SELECT * FROM users";
    const userData: QueryResult = await pool.query(query);

    console.log(userData.rows);

    res.status(201).send({
      message: "User data.",
    });
  } catch (error) {
      console.log(error.message);
  }
};
