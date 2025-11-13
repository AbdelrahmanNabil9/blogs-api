const authService = require("../services/auth.service");

const signUp = async (req, res, next) => {
	try {
		const user = await authService.signUp(req.body);

		const newUser = {
			_id: user._id,
			name: user.name,
			email: user.email,
			createdAt: user.createdAt,
		};
		res
			.status(201)
			.json({ message: "User created successfully", user: newUser });
	} catch (error) {
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
