import express from 'express';
import {getMessages,createMessage, deleteMessage} from '../controllers/UserController.js';

const router = express.Router();
router.get('/getMessages', getMessages);
router.post('/createMessage', createMessage);
router.delete('/deleteMessage/:id', deleteMessage);

export default router;
