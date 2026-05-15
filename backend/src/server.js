require("dotenv").config();

const http = require("http");

const app = require("./app");

const { Server } = require("socket.io");

const connectDB = require("./config/db");

// Connect Database
connectDB();

// Create Server
const server = http.createServer(app);

// Socket setup
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Export io globally
app.set("io", io);

// PORT
const PORT = process.env.PORT || 5000;

// Start Server
server.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});
