const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["wishlist", "applied", "shortlisted", "interview", "result"],
      default: "wishlist",
      required: true,
    },
    priority: {
      type: String,
      enum: ["high", "medium", "low"],
      default: "medium",
    },
    sector: {
      type: String,
      enum: ["IT", "Finance", "Core", "Consulting", "Product"],
    },
    location: {
      type: String,
    },
    ctcOffered: {
      type: Number,
    },
    applyUrl: {
      type: String,
    },
    notes: {
      type: String,
      maxlength: 1000,
    },
    interviewDate: {
      type: Date,
    },
    resultStatus: {
      type: String,
      enum: ["offered", "rejected", "waitlisted"],
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);
// jobSchema.pre("save", function (next) {
//   // Case 1
//   if (this.status === "result" && !this.resultStatus) {
//     return next(new Error("resultStatus is required when status is result"));
//   }
//   // Case 2
//   if (this.status !== "result" && this.resultStatus) {
//     return next(new Error("resultStatus only allowed when status is result"));
//   }
//   next();
// });

module.exports = mongoose.model("Job", jobSchema);