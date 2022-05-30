const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// Middleware
app.use(express.json())

// Middleware for user interface
// app.use(express.static('./public'))

// Pulling routes (and controllers)
app.use('/api/v1/tasks', tasks)

// 404 for nonexistent url
app.use(notFound)

// invalid entry for refactored task controller code
app.use(errorHandlerMiddleware)

// Activate port and db
const port = process.env.PORT || 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`server is listening on port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}

start()

