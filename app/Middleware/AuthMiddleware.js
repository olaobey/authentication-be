const jwt = require("jsonwebtoken");
const User = use("App/Models/User");
const Auth = use('Adonis/Src/Auth');
const Config = use("Config");

class AuthMiddleware {
  async handle({ request, response, auth }, next, properties) {
    response.implicitEnd = false
    try {
      // Extract token and handle missing/invalid authorization headers
      const authorizationHeader = request.headers().authorization;
      const token = authorizationHeader?.split(" ")[1];
      if (!token || !authorizationHeader.startsWith("Bearer ")) {
        return response.status(403).json({
          status: "error",
          message: "ACCESS FORBIDDEN! Authorization header is required and must start with 'Bearer'.",
          success: false,
        });
      }

      // Verify token and find user
      await jwt.verify(token, Config.get('app.appKey'), async (err, decoded) => {
        if (err) {
          return response.status(404).json({
            status: "error",
            message:
              "JWT TOKEN INVALID! JWT token is expired/invalid. Please logout and login again",
              success: false,
          });
        }

        const userId = decoded.id;
        const user = await User.findBy("id",userId);

      // Handle invalid token or missing user
      if (!user) {
        return response.status(401).json({
          status: "error",
          message: "Invalid token or user not found",
          success: false,
        });
      }

      // Set the user to auth object for later use in the request lifecycle
      // auth.setUser(user);

      // Check if the user has the required role
      // const requiredRole = properties[0];
      // if (request.user.role !== requiredRole){
      //   return response.status(403).json({
      //     status: "error",
      //     message: `ACCESS FORBIDDEN!  ${requiredRole} access required.`,
      //     success: false
      //   });
      // }

      // Attach user to request context for downstream usage
      request.user= user;

      await next();
    });

    } catch (error) {
      return response.status(401).json({
        status: "error",
        message: "Invalid token",
        success: false,
      });
    }
  }
}


module.exports = AuthMiddleware;