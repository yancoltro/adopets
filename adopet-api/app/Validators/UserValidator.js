'use strict'

class UserValidator {

  get rules() {
    return {
      name: 'required|string|min:3|max:64',
      email: 'required|email|unique:users,email|max:128',
      password: 'required|alpha_numeric|min:8|max:64',
    }
  }

  get messages() {
    return {
      'name.required': 'You must provide the name of the user',
      'name.string': 'Name must be string',
      'name.min': 'Very short name',
      'name.max': 'Very long name',

      'email.required': 'You must provide the email of the user',
      'email.email': 'Insert valid email',
      'email.unique': 'This registered email already exists',
      'email.max': 'Very long email',

      'password.required':'You must provide the password of the user',
      'password.alpha_numeric':'The password need alpha numeric characters',
      'password.min':'Very short password',
      'password.max': 'Very long password',
    }
  }

  /**
   * If the data not pass in tests, defined by rules() function
   * the validator dispatch respective messages in response, with this function
   * 422 status is unprocessable entity
   */
  async fails(errorMessages) {
    return this.ctx.response.status(422)
      .json({ error: errorMessages[0].message })
	}

}

module.exports = UserValidator
