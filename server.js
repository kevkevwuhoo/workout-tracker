const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "/public")));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
});

// Routes
// *** HTML ***
app.get("/", (req,res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/exercise", (req,res) => {
  res.sendFile(path.join(__dirname, "public", "exercise.html"));
});

app.get("/stats", (req,res) => {
  res.sendFile(path.join(__dirname, "public", "stats.html"));
});

// *** API ***
app.get("/api/workouts", (req, res) => {
  db.Workout.find().sort({day: 1}).exec((err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
});

app.get("/api/workouts/range", (req, res) => {
  const startDate = new Date().setDate(new Date().getDate()-7);
  db.Workout.find({day: {$gte: startDate}}, (err, data) => {
  // db.Workout.find({}, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
});

app.put("/api/workouts/:id", async (req, res) => {
  try {
    const currentWorkout = await db.Workout.findOne({
      _id: req.params.id,
    });

    const savedWorkout = await currentWorkout.addExercise(req.body);
    res.json(savedWorkout);
  } catch (err) {
    throw err;
  }
});

app.post("/api/workouts", (req,res) => {
  db.Workout.create(req.body,
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
