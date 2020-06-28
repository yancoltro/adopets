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
  return { greeting: 'Welcome to Adopet API' }
})


Route.post('register', 'UserController.register').validator('UserValidator')
Route.post('login', 'UserController.login')
Route.post('logout', 'UserController.logout').middleware(['auth'])
 
/**
 * I chose to make this url explicit for whoever or who opened or coded the system
 * quickly realized that the API should offer this filtering function, as described below.
 * I could use the index method, capturing the parameters,
 * however, resolve to separate responsibilities
 */
Route.get('products/filter=:field?&value=:value&page=:page?',
  'ProductController.filter').middleware(['auth'])

/**
 * Product api
 */
Route.resource('products', 'ProductController')
  .validator(new Map([
    [['products.store'], ['ProductValidator']],
    [['products.update'], ['ProductValidator']]
  ]))
  .apiOnly()
  .middleware(['auth'])