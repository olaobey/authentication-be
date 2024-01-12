'use strict'


class RoleCheck {
  async handle({ request, auth, response }, next, allowedRoles) {
    const user = request.user
    console.log('User Role:', user.role);
    if (!user) {
      return response.status(401).json({
        status: 'error',
        message: 'Unauthorized',
        success: false,
      })
    }

    const requiredRoles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
    console.log('Required Roles:', requiredRoles); 
    if (!requiredRoles.includes(user.role)) {
      return response.status(403).json({
        status: 'error',
        message: 'Forbidden',
        success: false,
      })
    }

    await next()
  }
}

module.exports = RoleCheck