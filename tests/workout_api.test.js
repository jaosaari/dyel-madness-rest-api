const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")

const api = supertest(app)

test("workouts are returned as json", async () => {
  await api
    .get("/api/workouts")
    .expect(200)
    .expect("Content-Type", /application\/json/)
})

test("there are four workouts", async () => {
  const response = await api.get("/api/workouts")

  expect(response.body).toHaveLength(4)
})

test("the first workout is about shoulder press", async () => {
  const response = await api.get("/api/workouts")

  expect(response.body[0].lift).toBe("shoulder press")
})

afterAll(() => {
  mongoose.connection.close()
})
