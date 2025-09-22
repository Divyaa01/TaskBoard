import express from 'express';

import { getTasks, getTaskById, createTask, updateTask, deleteTask } from '../controller/taskController.js';
import authMiddleware from '../middleware/auth.js';

const taskRouter= express.Router();

taskRouter.route('/')
.get(authMiddleware, getTasks)
.post(authMiddleware, createTask);

taskRouter.route('/:id')
.get(authMiddleware, getTaskById)
.put(authMiddleware, updateTask)
.delete(authMiddleware, deleteTask);

export default taskRouter;