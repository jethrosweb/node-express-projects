// Refactored code using async and error-handler middleware as well as custom-error file
// see initial-tasks-code for original code
const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')

// get (list) all tasks
const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({})
    res.status(200).json({ tasks })
})

// create a new task
const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({ task })
})

// get a single task
const getTask = asyncWrapper(async (req, res, next) => {
    const {id: taskID} = req.params
    const task = await Task.findOne({ _id: taskID })

    if (!task) {
        return next(createCustomError(`No task with id: ${taskID}`, 404))
    } else {
        return res.status(200).json({ task })
    }
})

// delete a task
const deleteTask = asyncWrapper(async (req, res) => {
    const {id: taskID} = req.params
    const task = await Task.findOneAndDelete({ _id: taskID })

    if (!task) {
        return next(createCustomError(`No task with id: ${taskID}`, 404))
    } else {
        return res.status(200).json({ task })
    }
})

// update a task
const updateTask = asyncWrapper(async (req, res) => {
    const {id: taskID} = req.params
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
        new: true,
        runValidators: true
    })

    if (!task) {
        return next(createCustomError(`No task with id: ${taskID}`, 404))
    } else {
        return res.status(200).json({ task })
    }
})

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    deleteTask,
    updateTask  
}