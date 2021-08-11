import { Request, Response } from 'express'
import { pool } from '../config/database'
import { QueryResult } from 'pg'
import { jwtGenerate, comparePassword, encryptPassword } from '../utils/security'
import { loginInterface, registerInterface } from '../types/userAdapter'

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const getAllUserQuery = 'SELECT * FROM users'
    const userData: QueryResult = await pool.query(getAllUserQuery)

    if (userData.rowCount < 0) return res.status(204).json([])

    res.status(201).json(userData.rows)
  } catch (error) {
    res.status(500).json('Server error: ' + error.message)
  }
}

export const registerUser = async (req: Request, res: Response) => {
  try {
    // body request
    const { name, email, password }: registerInterface = req.body

    // check for if user exist
    const getUserByEmailQuery = 'SELECT * FROM users WHERE email = $1'
    const userData: QueryResult = await pool.query(getUserByEmailQuery, [email])

    if (userData.rowCount > 0) return res.status(401).json('Account already exist')

    const encryptedPass = await encryptPassword(password)

    // insert new user to database server
    const addUserQuery = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *'
    await pool.query(addUserQuery, [name, email, encryptedPass])

    return res.status(200).json('Register successful')
  } catch (error) {
    console.log(error)
    return res.status(500).json('Server error: ' + error.message)
  }
}

export const loginUser = async (req: Request, res: Response) => {
  try {
    // request body
    const { email, password }: loginInterface = req.body

    // query in database server
    const getUserByEmailQuery = 'SELECT * FROM users WHERE email = $1'
    const userData: QueryResult = await pool.query(getUserByEmailQuery, [email])

    if (userData.rowCount == 0) return res.status(400).json('Account does not exist')

    // check password
    const result = userData.rows[0]
    const validPass = await comparePassword(password, result)

    if (!validPass) return res.status(409).json('Incorrect password')

    // return a json token response
    const jwtToken = jwtGenerate(result)

    const data = {
      id: result.id,
      name: result.name,
      email: result.email,
      token: jwtToken,
    }

    return res.status(200).json(data)
  } catch (error) {
    console.log(error)
    return res.status(500).json('Server error: ' + error.message)
  }
}
