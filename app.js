const express = require("express");
const routes = require("./routes");

const app = express();

// Parse JSON request bodies
app.use(express.json());

// Main routes
app.use("/api", routes);

// Simple root endpoint
app.get("/", (req, res) => {
	res.send("Blog API is running!");
});

// Global error handler (basic)
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(err.statusCode || 500).json({
		message: err.message || "Something went wrong!",
	});
});

module.exports = app;
