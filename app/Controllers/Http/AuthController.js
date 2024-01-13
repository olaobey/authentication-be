"use strict";
const User = use("App/Models/User");
const Hash = use("Hash");
const jwt = require("jsonwebtoken");
const Config = use("Config");



class AuthController {
  async register({ request, response }) {
    try {
      const userData = request.only([
        "firstname",
        "lastname",
        "email",
        "password",
        "role",
      ]);

      // Set the default role to user
      userData.role = userData.role || "user";

      // Role validation
      const allowedRoles = ["user", "admin"];
    if (!allowedRoles.includes(userData.role)) {
      return response.status(400).json({
        status: "error",
        message: "Invalid role",
        success: false,
      });
    }

      // Convert email to lowercase
      userData.email = userData.email.toLowerCase();

      const userExists = await User.findBy("email", userData.email);
      if (userExists) {
        return response.status(400).send({
          status: "error",
          message: "User already registered",
          success: false,
        });
      }

      const user = await User.create(userData);
      return response.status(200).json({
        status: "ok",
        data: user,
        message: "User registered successfully",
        success: true,
      });
    } catch (error) {
      console.error(error);
      response.status(500).json({
        status: "error",
        message: "Internal server error",
        success: false,
      });
    }
  }

  async login({ request, auth, response }) {
    const { email, password } = request.only(["email", "password"]);
    try {
      const user = await User.findBy("email", email);
      if (!user) {
        return response.status(404).json({
          status: "error",
          message: "User not found",
          success: false,
        });
      }
      const isPasswordValid = await Hash.verify(password, user.password);
      if (!isPasswordValid) {
        return response.status(401).json({
          status: "error",
          message: "Invalid password",
          success: false,
        });
      }

      // Generate JWT token with login status
      const accessToken = jwt.sign(
        {
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          role: user.role,
        },
        Config.get("app.appKey"),
        { expiresIn: "15m" }
      );
      return response.json({
        status: "ok",
        message: "User login successfully",
        data: user,
        access_token: accessToken,
        success: true,
      });
    } catch (error) {
      console.error(error);
      return response.status(500).json({
        status: "error",
        message: "Internal server error",
        success: false,
      });
    }
  }

  async profile({ request, auth, response }) {
    const userId = request.user.id;
    try {
      const user = await User.findBy("id", userId);
      if (!user) {
        return response.status(404).json({
          status: "error",
          message: "User not found",
          success: false,
        });
      }

      return response.status(200).json({
        status: "ok",
        message: "User details successfully retrieved",
        data: user,
        success: true,
      });
    } catch (error) {
      console.error(error);
      response.status(500).json({
        status: "error",
        message: "Internal server error",
        success: false,
      });
    }
  }
}

module.exports = AuthController;
