// Inital setup without async middleware 
const Task = require('../models/Task')

// get (list) all tasks
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).json({ tasks })
        // Alternative successful response messages: 
        // res.status(200).json({ tasks, amount: tasks.length })
        // res.status(200).json({ success: true, data: {tasks, nbHits: tasks.length} })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

// create a new task
const createTask =  async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(200).json({ task })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

// get a single task
const getTask = async (req, res) => {
    try {
        const {id: taskID} = req.params
        const task = await Task.findOne({ _id: taskID })

        if (!task) {
            // if correct syntax for id, but no id exists this error message will send
            return res.status(404).json({ msg: `No task with id: ${taskID}` })
        } else {
            return res.status(200).json({ task })
        }
    } catch (error) {
        // if not correct syntax, meaning no matching id, this error will send
        res.status(500).json({ msg: error })
    }
}

// delete a task
const deleteTask = async (req, res) => {
    try {
        const {id: taskID} = req.params
        const task = await Task.findOneAndDelete({ _id: taskID })

        if (!task) {
            return res.status(404).json({ msg: `No task with id: ${taskID}` })
        } else {
            return res.status(200).json({ task })
            // Alternative successful response messages: 
            // return res.status(200).send()
            // return res.status(200).json({ task: null, status: 'success' })
        }
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

// update a task
const updateTask = async (req, res) => {
    try {
        const {id: taskID} = req.params
        
        const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
            new: true,
            runValidators: true
        })

        if (!task) {
            return res.status(404).json({ msg: `No task with id: ${taskID}` })
        } else {
            return res.status(200).json({ task })
        }
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    deleteTask,
    updateTask  
}