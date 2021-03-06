const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now,
  },
  exercises: [
    {
      type: {
        type: String,
        trim: true,
        enum: ["cardio", "resistance"],
        required: "Exercise type must be Cardio or Resistance"
      },
      name: {
        type: String,
        trim: true,
        required: "Exercise Name is Required",
      },
      duration: {
        type: Number,
        trim: true,
        required: "Exercise Duration is Required",
      },
      weight: {
        type: Number,
        trim: true,
      },
      reps: {
        type: Number,
        trim: true,
      },
      sets: {
        type: Number,
        trim: true,
      },
      distance: {
        type: Number,
        trim: true,
      }
    }
  ],
  totalDuration: Number,
});

WorkoutSchema.methods.calculateTotalDuration = function () {
  let total = 0;
  this.exercises.forEach((exercise) => {
    total += exercise.duration;
  });
  this.totalDuration = total;
  return this.totalDuration;
};

WorkoutSchema.methods.addExercise = function (exercise) {
  this.exercises.push(exercise);
  this.calculateTotalDuration();
  return this.save();
};

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
