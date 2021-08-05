import { Request, Response, NextFunction } from "express";
import { pool } from "../database";
import { QueryResult } from "pg";
import { jwtGenerate, comparePassword, encryptPassword } from "../utils/security";
import { loginInterface, registerInterface } from "../types/user";

export const getAllUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = "SELECT * FROM users";
    const userData: QueryResult = await pool.query(query);

    res.status(201).json(userData.rows);
  } catch (error) {
    res.status(500).json("Server error: " + error.message);
  }
};

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // body request
    const { name, email, password } : registerInterface = req.body;

    // check for if user exist
    const query = "SELECT * FROM users WHERE email = $1";
    const userData: QueryResult = await pool.query(query, [email]);

    if (userData.rowCount !== 0) {
      return res.status(401).json({ message: "Data user already exist" });
    }
    
    const encryptedPass = await encryptPassword(password)

    // insert new user to database server
    const addUserQuery =
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *";
    const newUser: QueryResult = await pool.query(addUserQuery, [
      name,
      email,
      encryptedPass,
    ]);

    return res.status(200).json({ message: "Register successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: "Server error: " + error.message});
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // request body
    const { email, password } : loginInterface = req.body

    // query in database server
    const query = "SELECT * FROM users WHERE email = $1";
    const userData: QueryResult = await pool.query(query, [email]);

    if (userData.rowCount === 0) return res.status(400).json('Email does not exist')

    // check password
    const validPass = await comparePassword(password, userData.rows[0])

    if (!validPass) return res.status(409).json('Incorrect password')

    // return a json token response
    const jwtToken = jwtGenerate(userData.rows[0])

    return res.status(200).json({ data: jwtToken});
    
  } catch (error) {
    console.log(error);
    return res.status(500).json("Server error: " + error.message );
  }
};
