'use strict'

const Suite = use('Test/Suite')('User')
const User = use('App/Models/User')
const { test, trait, before } = Suite

trait('Auth/Client')
trait('Test/ApiClient')
/**
 * Remove all users into database
 */

test('[[POST]{register}: Create new invalid user (unnamed)', async ({ client }) => {
  const response = await client
    .post('register')
    .send({
      name: '',
      email: 'cabral@adopets.org',
      password: 'adopets1'
    }).end()

  response.assertStatus(422)
  response.assertJSON({
    error: "You must provide the name of the user"
  })
})

test('[[POST]{register}: Create new invalid user (short name)', async ({ client }) => {
  const response = await client
    .post('register')
    .send({
      name: 'a',
      email: 'cabral@adopets.org',
      password: 'adopets1'
    }).end()

  response.assertStatus(422)
  response.assertJSON({
    error: "Very short name"
  })
})

test('[[POST]{register}: Create new invalid user (long name)', async ({ client }) => {
  const response = await client
    .post('register')
    .send({
      name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ullamcorper eu enim at cursus. Ut volutpat vel massa at dictum',
      email: 'cabral@adopets.org',
      password: 'adopets1'
    }).end()

  response.assertStatus(422)
  response.assertJSON({
    error: "Very long name"
  })
})

test('[[POST]{register}: Create new invalid user (no email)', async ({ client }) => {
  const response = await client
    .post('register')
    .send({
      name: 'Pedro Alvares Cabral',
      email: '',
      password: 'adopets1'
    }).end()

  response.assertStatus(422)
  response.assertJSON({
    error: "You must provide the email of the user"
  })
})

test('[[POST]{register}: Create new invalid user (invalid email)', async ({ client }) => {
  const response = await client
    .post('register')
    .send({
      name: 'Pedro Alvares Cabral',
      email: 'noemail@',
      password: 'adopets1'
    }).end()

  response.assertStatus(422)
  response.assertJSON({
    error: "Insert valid email"
  })
})

test('[[POST]{register}: Create new invalid user (long invalid email)', async ({ client }) => {
  const response = await client
    .post('register')
    .send({
      name: 'Pedro Alvares Cabral',
      email: 'uncullamcorpereu67uncullamcorpereu67uncullamcorpereu67uncullamcorpereu67uncullamcorpereu67uncullamcorpereu67uncullamcorpereu67uncullamcorpereu67@adopets.org',
      password: 'adopets1'
    }).end()

  response.assertStatus(422)
  response.assertJSON({
    error: "Insert valid email"
  })
})

test('[[POST]{register}: Create new invalid user (no password)', async ({ client }) => {
  const response = await client
    .post('register')
    .send({
      name: 'Pedro Alvares Cabral',
      email: 'cabral@adopets.org',
      password: ''
    }).end()

  response.assertStatus(422)
  response.assertJSON({
    error: "You must provide the password of the user"
  })
})

test('[[POST]{register}: Create new invalid user (no alpha numeric password)', async ({ client }) => {
  const response = await client
    .post('register')
    .send({
      name: 'Pedro Alvares Cabral',
      email: 'cabral@adopets.org',
      password: '****////-++..+-*/'
    }).end()

  response.assertStatus(422)
  response.assertJSON({
    error: "The password need alpha numeric characters"
  })
})

test('[[POST]{register}: Create new invalid user (short password)', async ({ client }) => {
  const response = await client
    .post('register')
    .send({
      name: 'Pedro Alvares Cabral',
      email: 'cabral@adopets.org',
      password: 'qazxs6'
    }).end()

  response.assertStatus(422)
  response.assertJSON({
    error: "Very short password"
  })
})

test('[[POST]{register}: Create new invalid user (long password)', async ({ client }) => {
  const response = await client
    .post('register')
    .send({
      name: 'Pedro Alvares Cabral',
      email: 'cabral@adopets.org',
      password: 'uncullamcorpereu67uncullamcorpereu67uncullamcorpereu67uncullamcorpereu67uncullamcorpereu67uncullamcorpereu67uncullamcorpereu67uncullamcorpereu67'
    }).end()

  response.assertStatus(422)
  response.assertJSON({
    error: "Very long password"
  })
})

test('[[POST]{register}: Create new valid user', async ({ client }) => {
  const response = await client
    .post('register')
    .send({
      name: 'Pedro Alvares Cabral',
      email: 'cabral@adopets.org',
      password: 'adopets1'
    }).end()

  response.assertStatus(200)
  response.assertJSONSubset({
    name: 'Pedro Alvares Cabral',
    email: 'cabral@adopets.org'
  })
})

test('[[POST]{register}: Create new invalid user (duplicated email)', async ({ client }) => {
  const response = await client
    .post('register')
    .send({
      name: 'Pedro Alvares Cabral',
      email: 'cabral@adopets.org',
      password: 'adopets1'
    }).end()

  response.assertStatus(422)
  response.assertJSON({
    error: "This registered email already exists"
  })
})

test('[[POST]{login}: Login with the new user', async ({ client }) => {
  const response = await client
    .post('login')
    .send({
      name: 'Pedro Alvares Cabral',
      email: 'cabral@adopets.org',
      password: 'adopets1'
    }).end()

  response.assertStatus(200)
  response.assertJSONSubset({
    type: "bearer"
  })
})

test('[[POST]{login}: Login with invalid user', async ({ client }) => {
  const response = await client
    .post('login')
    .send({
      name: 'Pedro Alvares Cabral',
      email: 'cabral@adopets.org',
      password: 'password_not_is_this'
    }).end()

  response.assertStatus(401)
})

test('[[POST]{logout}: Logout', async ({ client }) => {
  const user = await User.findBy('email', 'cabral@adopets.org')
  const response = await client
    .post('logout')
    .loginVia(user, 'api')
    .end()

  response.assertStatus(200)
})