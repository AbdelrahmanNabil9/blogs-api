const express = require("express");
const blogController = require("../controllers/blog.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");
const blogValidation = require("../validations/blog.validation");

const router = express.Router();

router
	.route("/")
	.post(
		authMiddleware,
		validate(blogValidation.createBlog),
		blogController.createBlog
	)
	.get(blogController.getBlogs);

router
	.route("/:id")
	.put(
		authMiddleware,
		validate(blogValidation.updateBlog),
		blogController.updateBlog
	)
	.delete(authMiddleware, blogController.deleteBlog);

module.exports = router;
