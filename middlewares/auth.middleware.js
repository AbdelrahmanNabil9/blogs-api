const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authMiddleware = async (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return res
			.status(401)
			.json({ message: "Authentication invalid: No token provided" });
	}

	const token = authHeader.split(" ")[1];

	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);

		// Attach user to the request object
		req.user = await User.findById(payload.userId).select("-password");

		if (!req.user) {
			return res
				.status(401)
				.json({ message: "Authentication invalid: User not found" });
		}

		next();
	} catch (error) {
		return res
			.status(401)
			.json({ message: "Authentication invalid: Token verification failed" });
	}
};

module.exports = authMiddleware;
