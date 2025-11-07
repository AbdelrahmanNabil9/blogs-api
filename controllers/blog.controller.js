const blogService = require("../services/blog.service");

const createBlog = async (req, res) => {
	try {
		const blog = await blogService.createBlog(req.body, req.user._id);
		res.status(201).json({ message: "Blog created successfully", blog });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

const getBlogs = async (req, res) => {
	try {
		const result = await blogService.queryBlogs(req.query);
		res.status(200).json(result);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const updateBlog = async (req, res) => {
	try {
		const updatedBlog = await blogService.updateBlog(
			req.params.id,
			req.body,
			req.user._id
		);
		res
			.status(200)
			.json({ message: "Blog updated successfully", blog: updatedBlog });
	} catch (error) {
		if (error.message.startsWith("Forbidden")) {
			return res.status(403).json({ message: error.message });
		}
		if (error.message === "Blog not found") {
			return res.status(404).json({ message: error.message });
		}
		res.status(400).json({ message: error.message });
	}
};

const deleteBlog = async (req, res) => {
	try {
		await blogService.deleteBlog(req.params.id, req.user._id);
		res.status(200).json({ message: "Blog deleted successfully" });
	} catch (error) {
		if (error.message.startsWith("Forbidden")) {
			return res.status(403).json({ message: error.message });
		}
		if (error.message === "Blog not found") {
			return res.status(404).json({ message: error.message });
		}
		res.status(500).json({ message: error.message });
	}
};

module.exports = {
	createBlog,
	getBlogs,
	updateBlog,
	deleteBlog,
};
