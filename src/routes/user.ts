import express from "express";
import { getAllUser, registerUser, loginUser } from '../controllers/user.controller'

const router = express.Router();

router.get('/',  getAllUser)
// router.get('/:id', getUserById)
router.post('/register', registerUser)
router.post('/login', loginUser)

export default router ;
