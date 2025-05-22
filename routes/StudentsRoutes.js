import express from 'express';
import {
    addSchool,
    listSchools,
    location,
    renderIndex
} from '../Controller/StudentController.js';

const router = express.Router();

// API Routes
router.post('/addSchool', addSchool);
router.get('/listSchools', listSchools);
router.post('/location', location);

// View Routes
router.get('/', renderIndex);


export default router;