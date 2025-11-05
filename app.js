const express = require("express");
const routes = require("./routes");

const app = express();

app.use(express.json());

app.use("/api", routes);

app.get("/", (req, res) => {
	res.send("Blog API is running!");
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(err.statusCode || 500).json({
		message: err.message || "Something went wrong!",
	});
});

module.exports = app;
