const Blog = require("../models/blog.model");

const createBlog = async (blogData, userId) => {
	const { title, content, category } = blogData;
	const blog = await Blog.create({
		title,
		content,
		category,
		owner: userId,
	});
	return blog;
};

const queryBlogs = async (queryParams) => {
	const { category, search, page = 1, limit = 10 } = queryParams;

	const query = {};

	if (category) {
		query.category = category;
	}

	if (search) {
		query.$or = [
			{ title: { $regex: search, $options: "i" } },
			{ content: { $regex: search, $options: "i" } },
		];
	}

	const skip = (page - 1) * limit;
	const totalBlogs = await Blog.countDocuments(query);
	const blogs = await Blog.find(query)
		.populate("owner", "name email")
		.sort({ createdAt: -1 })
		.skip(skip)
		.limit(Number(limit));

	return {
		blogs,
		currentPage: Number(page),
		totalPages: Math.ceil(totalBlogs / limit),
		totalBlogs,
	};
};

const getBlogById = async (blogId) => {
	const blog = await Blog.findById(blogId);
	if (!blog) {
		throw new Error("Blog not found");
	}
	return blog;
};

const updateBlog = async (blogId, updateData, userId) => {
	const blog = await getBlogById(blogId);

	if (blog.owner.toString() !== userId.toString()) {
		throw new Error("Forbidden: You can only edit your own blogs");
	}

	blog.set(updateData);
	await blog.save();
	return blog;
};

const deleteBlog = async (blogId, userId) => {
	const blog = await getBlogById(blogId);

	if (blog.owner.toString() !== userId.toString()) {
		throw new Error("Forbidden: You can only delete your own blogs");
	}

	await blog.deleteOne();
	return { message: "Blog deleted successfully" };
};

module.exports = {
	createBlog,
	queryBlogs,
	updateBlog,
	deleteBlog,
};
