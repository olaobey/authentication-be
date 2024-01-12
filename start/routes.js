'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const RoleCheck = use('App/Middleware/RoleCheck')

// User Routes
Route.group(() => {

Route.post('/auth/register', 'AuthController.register')

Route.post('/auth/login', 'AuthController.login')

Route.get('/user/profile', 'AuthController.profile').middleware('jwtAuth')

}).prefix('/api/v1')


Route.group(() => {

    Route.get('/admin/users', 'AdminController.getUsers').middleware(['jwtAuth', 'roleCheck:admin']);

  }).prefix('/api/v1')

Route.on('/').render('welcome')
