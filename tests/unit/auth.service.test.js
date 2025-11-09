const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const authService = require("../../services/auth.service");
const User = require("../../models/user.model");
require("dotenv").config();

let mongoServer;

beforeAll(async () => {
	mongoServer = await MongoMemoryServer.create();
	const uri = mongoServer.getUri();
	await mongoose.connect(uri);
});

afterEach(async () => {
	await User.deleteMany({});
});

afterAll(async () => {
	await mongoose.disconnect();
	await mongoServer.stop();
});

describe("Auth Service", () => {
	describe("signUp", () => {
		const validUserData = {
			name: "Test User",
			email: "test@example.com",
			password: "password123",
		};

		it("should create a new user and hash the password", async () => {
			const user = await authService.signUp(validUserData);

			expect(user).toBeDefined();
			expect(user.email).toBe(validUserData.email);
			expect(user.name).toBe(validUserData.name);
			expect(user.password).not.toBe(validUserData.password);

			const isMatch = await user.comparePassword(validUserData.password);
			expect(isMatch).toBe(true);
		});

		it("should throw an error if email is already taken", async () => {
			await authService.signUp(validUserData);

			await expect(authService.signUp(validUserData)).rejects.toThrow(
				"Email already in use"
			);
		});
	});

	describe("login", () => {
		const loginCredentials = {
			email: "login@example.com",
			password: "password123",
		};

		beforeEach(async () => {
			await authService.signUp({ name: "Login User", ...loginCredentials });
		});

		it("should login a user with valid credentials and return a JWT", async () => {
			const token = await authService.login(
				loginCredentials.email,
				loginCredentials.password
			);

			expect(token).toBeDefined();
			expect(typeof token).toBe("string");
		});

		it("should throw an error for a non-existent email", async () => {
			await expect(
				authService.login("wrong@example.com", loginCredentials.password)
			).rejects.toThrow("Invalid credentials");
		});

		it("should throw an error for an incorrect password", async () => {
			await expect(
				authService.login(loginCredentials.email, "wrongpassword")
			).rejects.toThrow("Invalid credentials");
		});
	});
});
