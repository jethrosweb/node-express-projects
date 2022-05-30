const mongoose = require('mongoose')

// set variables (with validation) that can be added to db
const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'must provide name'],
        trim: true,
        maxlength: [20, 'name cannot exceed 20 characters']
    }, 
    completed: {
        type: Boolean,
        default: false
    }
})

// export to task controllers for use 
module.exports = mongoose.model('Task', TaskSchema) 