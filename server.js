const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
});

// Routes
app.get("/api/workouts", async (req, res) => {
  try {
    const allWorkouts = await db.Workout.find({});
    res.json(allWorkouts);
  } catch (err) {
    res.json(err);
  }
});

// app.put("/api/workouts", async (req, res) => {
//   try {
//     const newExercise = await db.Workout.update(req.body);
//     res.json(newExercise);
//   }
// })
app.put("/api/workouts/:id", (req, res) => {
  db.Workout.update(
    { _id: req.params.id },
    {
      $push: { exercises: req.body },
    },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.json(data);
      }
    }
  );
});


// Start the server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
