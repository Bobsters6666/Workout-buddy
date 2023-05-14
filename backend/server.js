require('dotenv').config()

const express = require('express')  //initialise express
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')

// start up express app, invoke a function
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// react to request, a function is fired when at root '/'
app.use('/api/workouts/', workoutRoutes)

// connect to database
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for request at a specific port number, only listen once connected to database
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port 4000')
    })
  })
  .catch((error) => {
    console.log(error)
  })


