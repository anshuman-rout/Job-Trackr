const Job = require("../models/Job");

//CREATE JOB
exports.createJob = async (req, res) => {
  try {
    const {
      companyName,
      role,
      status,
      priority,
      sector,
      location,
      ctcOffered,
      applyUrl,
      notes,
      interviewDate,
      resultStatus,
    } = req.body;
    //VALIDATION
    if (status === "result" && !resultStatus) {
      return res.status(400).json({
        message: "resultStatus is required when status is result",
      });
    }
    if (status !== "result" && resultStatus) {
      return res.status(400).json({
        message: "resultStatus only allowed when status is result",
      });
    }
    const job = await Job.create({
      userId: req.user.userId,
      companyName,
      role,
      status,
      priority,
      sector,
      location,
      ctcOffered,
      applyUrl,
      notes,
      interviewDate,
      resultStatus,
    });
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//GET ALL JOBS
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//UPDATE JOB
exports.updateJob = async (req, res) => {
  try {
    const { status, resultStatus } = req.body;
    
    if (status === "result" && !resultStatus) {
      return res.status(400).json({
        message: "resultStatus is required when status is result",
      });
    }
    if (status !== "result" && resultStatus) {
      return res.status(400).json({
        message: "resultStatus only allowed when status is result",
      });
    }
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//DELETE JOB
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,});
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};