const Joi = require("joi");

const createBlog = {
	body: Joi.object().keys({
		title: Joi.string().required(),
		content: Joi.string().required(),
		category: Joi.string().required(),
	}),
};

const updateBlog = {
	body: Joi.object()
		.keys({
			title: Joi.string(),
			content: Joi.string(),
			category: Joi.string(),
		})
		.min(1),
};

module.exports = {
	createBlog,
	updateBlog,
};
