const Joi = require("joi");

const createBlog = {
	body: Joi.object()
		.keys({
			title: Joi.string().required(),
			content: Joi.string().required(),
			category: Joi.string().required(),
		})
		.strip(),
};

const updateBlog = {
	body: Joi.object()
		.keys({
			title: Joi.string(),
			content: Joi.string(),
			category: Joi.string(),
		})
		.min(1)
		.strip(),
};

module.exports = {
	createBlog,
	updateBlog,
};
