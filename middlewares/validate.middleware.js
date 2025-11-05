const Joi = require("joi");

// A generic validation middleware
const validate = (schema) => (req, res, next) => {
	// We only care about req.body for this project, but you can extend this
	const { value, error } = schema.body.validate(req.body);

	if (error) {
		const errorMessage = error.details
			.map((details) => details.message)
			.join(", ");
		// Simple error response
		return res.status(400).json({ message: errorMessage });
	}

	// Attach validated value to request
	req.body = value;
	return next();
};

module.exports = validate;
