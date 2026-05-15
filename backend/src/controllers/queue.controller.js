const Queue = require("../models/Queue");
const Token = require("../models/Token");
// CREATE QUEUE
const createQueue = async (req, res) => {
  try {
    const { departmentName } = req.body;

    const queue = await Queue.create({
      departmentName,
    });

    res.status(201).json({
      success: true,
      message: "Queue Created Successfully",
      queue,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL QUEUES
const getQueues = async (req, res) => {
  try {
    const queues = await Queue.find();

    res.status(200).json({
      success: true,
      queues,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GENERATE TOKEN
const generateToken = async (req, res) => {
  try {
    const { queueId, userId } = req.body;

    // Find queue
    const queue = await Queue.findById(queueId);

    if (!queue) {
      return res.status(404).json({
        message: "Queue Not Found",
      });
    }

    // Generate next token number
    const nextTokenNumber = queue.currentToken + queue.totalWaiting + 1;

    // Create token
    const token = await Token.create({
      tokenNumber: nextTokenNumber,
      queueId,
      userId,
    });

    // Increase waiting count
    queue.totalWaiting += 1;

    await queue.save();

    res.status(201).json({
      success: true,
      message: "Token Generated Successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// CALL NEXT TOKEN
const callNextToken = async (req, res) => {
  try {
    const { queueId } = req.body;

    // Find queue
    const queue = await Queue.findById(queueId);

    if (!queue) {
      return res.status(404).json({
        message: "Queue Not Found",
      });
    }

    // Find next waiting token
    const nextToken = await Token.findOne({
      queueId,
      status: "waiting",
    }).sort({ tokenNumber: 1 });

    if (!nextToken) {
      return res.status(404).json({
        message: "No Waiting Tokens",
      });
    }

    // Update token status
    nextToken.status = "active";

    await nextToken.save();

    const io = req.app.get("io");
    io.emit("queueUpdated");

    // Update queue
    queue.currentToken = nextToken.tokenNumber;

    if (queue.totalWaiting > 0) {
      queue.totalWaiting -= 1;
    }

    await queue.save();

    res.status(200).json({
      success: true,
      message: "Next Token Called",
      token: nextToken,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// COMPLETE TOKEN
const completeToken = async (req, res) => {
  try {
    const { tokenId } = req.params;

    // Find token
    const token = await Token.findById(tokenId);

    if (!token) {
      return res.status(404).json({
        message: "Token Not Found",
      });
    }

    // Update status
    token.status = "completed";

    await token.save();

    res.status(200).json({
      success: true,
      message: "Token Completed Successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createQueue,
  getQueues,
  generateToken,
  callNextToken,
  completeToken,
};
