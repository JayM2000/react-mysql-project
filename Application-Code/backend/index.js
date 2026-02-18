const express = require("express");
const cors = require("cors");
const tasks = require("./routes/tasks");

// import Sequelize connection
const sequelize = require("./db");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Test route
app.get("/ok", (req, res) => {
  res.status(200).send("ok");
});

// API routes
app.use("/api/tasks", tasks);

// Sync DB and start server
const port = process.env.PORT || 3500;

async function startServer() {
  try {
    // Authenticate DB connection
    await sequelize.authenticate();
    console.log("🔥 MySQL connected!");

    // Sync models (create tables if not exist)
    await sequelize.sync();
    console.log("📀 Models synced to database!");

    // Start server
    app.listen(port, () =>
      console.log(`🚀 Server listening on http://localhost:${port}`),
    );
  } catch (error) {
    console.error("❌ Unable to start server:", error);
  }
}

startServer();
