const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const signUp = async (userData) => {
	const { name, email, password } = userData;

	const existingUser = await User.findOne({ email });
	if (existingUser) {
		throw new Error("Email already in use");
	}

	const user = await User.create({ name, email, password });
	return user;
};

const login = async (email, password) => {
	const user = await User.findOne({ email });
	if (!user) {
		throw new Error("Invalid credentials");
	}

	const isPasswordMatch = await user.comparePassword(password);
	if (!isPasswordMatch) {
		throw new Error("Invalid credentials");
	}

	const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
		expiresIn: "1h",
	});

	return token;
};

module.exports = {
	signUp,
	login,
};
