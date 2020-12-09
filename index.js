const express = require("express")
const app = express()
const cors = require("cors")
require("dotenv").config()
const Workout = require("./models/workout")

app.use(cors())
app.use(express.json())
app.use(express.static("build"))

app.get("/api/workouts", (request, response) => {
  Workout.find({}).then(workouts => {
    response.json(workouts.map(workout => workout.toJSON()))
  })
})

app.post("/api/workouts", (request, response, next) => {
  const body = request.body

  const workout = new Workout({
    lift: body.lift,
    max: body.max,
    next: body.next,
    week: body.week,
    queue: body.queue,
    assLiftOne: body.assLiftOne,
    assLiftTwo: body.assLiftTwo,
    // important: body.important || false,
    // date: new Date(),
  })

  workout
    .save()
    .then(savedWorkout => savedWorkout.toJSON())
    .then(savedAndFormattedWorkout => {
      response.json(savedAndFormattedWorkout)
    })
    .catch(error => next(error))
})

app.get("/api/workouts/:id", (request, response, next) => {
  Workout.findById(request.params.id)
    .then(workout => {
      if (workout) {
        response.json(workout.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete("/api/workouts/:id", (request, response, next) => {
  Workout.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put("/api/workouts/:id", (request, response, next) => {
  const body = request.body

  const workout = {
    content: body.content,
    important: body.important,
  }

  Workout.findByIdAndUpdate(request.params.id, workout, { new: true })
    .then(updatedWorkout => {
      response.json(updatedWorkout.toJSON())
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === "CastError" && error.kind == "ObjectId") {
    return response.status(400).send({ error: "malformatted id" })
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
