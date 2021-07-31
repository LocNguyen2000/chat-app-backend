import { Request, Response, NextFunction } from "express";
import { pool } from "../database";
import { QueryResult } from "pg";
import bcrypt from "bcrypt";
import { jwtGenerate } from "../utils/jwtGenerator";

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
    const { name, email, password } = req.body;

    // check for if user exist
    const findUserQuery = "SELECT * FROM users WHERE email = $1";
    const userData: QueryResult = await pool.query(findUserQuery, [email]);

    if (userData.rowCount !== 0) {
      return res.status(401).json("Data user already exist");
    }
    // generate sault for bcrypt randomness
    const saultRound = 10;
    const sault = await bcrypt.genSalt(saultRound);

    // encrypt pass with bcrypt
    const encryptedPass = await bcrypt.hash(password, sault);

    // insert new user to database server
    const addUserQuery =
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *";
    const newUser: QueryResult = await pool.query(addUserQuery, [
      name,
      email,
      encryptedPass,
    ]);

    // return a jwt token for authentication.
    const token = jwtGenerate(newUser.rows[0])

    res.status(200).json(token);
  } catch (error) {
    res.status(500).json("Server error: " + error.message);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // request body
    const { email, password } = req.body

    // query in database server
    const findUserQuery = "SELECT * FROM users WHERE email = $1";
    const userData: QueryResult = await pool.query(findUserQuery, [email]);

    if (userData.rowCount === 0) return res.status(400).json('Invalid email')

    // check password
    const validPass = await bcrypt.compare(password, userData.rows[0].password)
    console.log(validPass);

    if (!validPass) return res.status(409).json('Incorrect password')

    // return a jwt token for authorization
    const token = jwtGenerate(userData.rows[0]);

    res.status(200).json(token);
    
  } catch (error) {
    res.status(500).json("Server error: " + error.message );
  }
};
