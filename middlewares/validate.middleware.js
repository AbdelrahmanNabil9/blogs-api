const Joi = require("joi");

const validate = (schema) => (req, res, next) => {
	const { value, error } = schema.body.validate(req.body);

	if (error) {
		const errorMessage = error.details
			.map((details) => details.message)
			.join(", ");
		return res.status(400).json({ message: errorMessage });
	}

	req.body = value;
	return next();
};

module.exports = validate;
