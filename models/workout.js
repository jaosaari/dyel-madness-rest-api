const mongoose = require("mongoose")
// mongoose.set("useFindAndModify", false)
// const url = process.env.MONGODB_URI

// console.log("connecting to", url)

// mongoose
//   .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(result => {
//     console.log("connected to MongoDB")
//   })
//   .catch(error => {
//     console.log("error connecting to MongoDB:", error.message)
//   })

const workoutSchema = new mongoose.Schema({
  lift: {
    type: String,
  },
  max: {
    type: Number,
    required: true,
    minlength: 1,
  },
  next: {
    type: Boolean,
  },
  week: {
    type: Number,
  },
  queue: {
    type: Number,
  },
  assLiftOne: {
    type: Object,
  },
  assLiftTwo: {
    type: Object,
  },
  // content: {
  //   type: String,
  //   minlength: 5,
  //   required: true,
  // },
})

workoutSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model("Workout", workoutSchema)
