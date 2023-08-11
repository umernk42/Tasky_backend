const Task = require('../models/taskModel');
const mongoose = require('mongoose');

//get all tasks
const getTasks = async (req,res) => {

    const tasks = await Task.find({}).sort({createdAt: -1});
    res.status(200).json(tasks);
}

//get a single task
const getTask = async (req,res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such task'});
    }

    const task = await Task.findById(id);

    if(!task){
        return response.status(404).json({error: 'No such task'});
    }

    res.status(200).json(task);
}

//create new task
const createTask = async (req,res) => {
    
    const {title} = req.body;

    let emptyField = false;

    if(!title) emptyField = true;
    
    if(emptyField){
        return res.status(400).json({error: 'Please fill the field'})
    }

    //add doc to dB
    try{
        const task = await Task.create({title});
        res.status(200).json(task);
    } catch(error){
        res.status(400).json({error: error.msg});
    }
}

//delete a task
const deleteTask = async (req, res) => {

    const {id} = req.params;

    //Check if type of ID is Valid mongoDB ID
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such task'});
    }

    const task = await Task.findOneAndDelete({_id: id});

    if(!task){
        return res.status(404).json({error: 'No such task'});
    }

    res.status(200).json(task);
}

//update a task
const updateTask = async (req ,res) => {

    const {id} = req.params;
    const {title} = req.body;
    let emptyField = false;

    if(!title) emptyField = true;
    
    if(emptyField){
        return res.status(400).json({error: 'Please fill the field'})
    }

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such task'});
    }

    const task = await Task.findOneAndUpdate({_id: id},{
        ...req.body
    });

    if(!task){
        return res.status(404).json({error: 'No such task'});
    }

    res.status(200).json(task);
}


module.exports = {
    createTask,
    getTask,
    getTasks,
    deleteTask,
    updateTask
}