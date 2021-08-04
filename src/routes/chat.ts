import express from 'express';
import { getConversationsByEmail, addConversation } from '../controllers/chat.controller'

const router = express.Router();

router.get('/', getConversationsByEmail)
router.post('/add', addConversation )
// router.post('/send', updateMessageInConversation)

export default router;