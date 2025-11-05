const authService = require("../services/auth.service");

const signUp = async (req, res, next) => {
	try {
		await authService.signUp(req.body);
		res.status(201).json({ message: "User created successfully" });
	} catch (error) {
		// Basic error handling
		res.status(400).json({ message: error.message });
	}
};

const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const token = await authService.login(email, password);
		res.status(200).json({ token });
	} catch (error) {
		res.status(401).json({ message: error.message });
	}
};

module.exports = {
	signUp,
	login,
};
