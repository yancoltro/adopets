'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.post('register', 'UserController.register').validator('UserValidator')
Route.post('login', 'UserController.login')
Route.post('logout', 'UserController.logout').middleware(['auth'])

Route.resource('products', 'ProductController')
  .validator(new Map([
    [['products.store'], ['ProductValidator']],
    [['products.update'], ['ProductValidator']]
  ]))
  .apiOnly()
  .middleware(['auth'])
