const workoutsRouter = require("express").Router()
const Workout = require("../models/workout")

workoutsRouter.get("/", (request, response) => {
  Workout.find({}).then(workouts => {
    response.json(workouts.map(workout => workout.toJSON()))
  })
})

workoutsRouter.get("/:id", (request, response, next) => {
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

workoutsRouter.post("/", (request, response, next) => {
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

workoutsRouter.delete("/:id", (request, response, next) => {
  Workout.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

workoutsRouter.put("/:id", (request, response, next) => {
  const body = request.body

  const workout = {
    lift: body.lift,
    max: body.max,
    next: body.next,
    week: body.week,
    queue: body.queue,
    assLiftOne: body.assLiftOne,
    assLiftTwo: body.assLiftTwo,
  }

  Workout.findByIdAndUpdate(request.params.id, workout, { new: true })
    .then(updatedWorkout => {
      response.json(updatedWorkout.toJSON())
    })
    .catch(error => next(error))
})

module.exports = workoutsRouter
