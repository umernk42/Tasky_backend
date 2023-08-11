const express = require('express');
const {
    createTask,
    getTasks,
    getTask,
    deleteTask,
    updateTask
} = require('../controllers/taskControllers');

const router = express.Router();

//GET all tasks
router.get('/',getTasks);

//GET single tasks
router.get('/:id',getTask);

//POST a new task
router.post('/',createTask);

//DELETE a task
router.delete('/:id',deleteTask);

//UPDATE a task
router.patch('/:id',updateTask);



module.exports = router;