import express from 'express'
import { noteAdd } from '../controllers/noteAddController.js';
import middleware from '../middleware/middleware.js';
import { noteGet } from '../controllers/noteGetController.js'
import { noteUpdate } from '../controllers/noteUpdateController.js'
import { noteDelete } from '../controllers/noteDeleteController.js';

const router = express.Router()

router.get('/', middleware, noteGet)

router.put('/:id', middleware, noteUpdate)

router.delete('/:id', middleware, noteDelete)

router.post('/add', middleware, noteAdd)

export default router;