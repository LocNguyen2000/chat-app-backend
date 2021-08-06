import express from 'express';
import { getConversationsByEmail, addConversation, updateMessageInConversation } from '../controllers/chat.controller'

const router = express.Router();

router.post('/', getConversationsByEmail)
router.post('/add', addConversation )
router.post('/send', updateMessageInConversation)

export default router;