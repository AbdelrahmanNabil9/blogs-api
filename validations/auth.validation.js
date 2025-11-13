const Joi = require("joi");

const signup = {
	body: Joi.object()
		.keys({
			name: Joi.string().required(),
			email: Joi.string().required().email(),
			password: Joi.string()
				.required()
				.min(8)
				.pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d).+$"))
				.messages({
					"string.pattern.base":
						"Password must contain at least one letter and one number",
				}),
		})
		.strip(),
};

const login = {
	body: Joi.object()
		.keys({
			email: Joi.string().required().email(),
			password: Joi.string().required(),
		})
		.strip(),
};

module.exports = {
	signup,
	login,
};
