const express = require("express");

const router = express.Router();

const {
  createQueue,
  getQueues,
  generateToken,
  callNextToken,
  completeToken,
} = require("../controllers/queue.controller");

// Create Queue
router.post("/create", createQueue);

// Generate Token
router.post("/generate-token", generateToken);

// Call Next Token
router.put("/next-token", callNextToken);

// Complete Token
router.put("/complete/:tokenId", completeToken);

// Get All Queues
router.get("/", getQueues);

module.exports = router;
