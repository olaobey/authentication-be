"use strict";
const Admin = use("App/Models/Admin");
const User = use("App/Models/User");

class AdminController {
  
  async getUsers({ request, response }) {
    try {
      const userProfiles = await User.all()

      response.status(200).json({
        status: "ok",
        message: "Users retrieved successfully",
        data: userProfiles,
        success: true
    })
    } catch (error) {
        response.status(500).json({
            status: "error",
            message: "Internal server error",
            success: false,
          });
    }
  }
}

module.exports = AdminController;
