'use strict'

class ProductValidator {

  get rules() {
    return {
      name: 'required|min:3|max:254',
      description: 'required|min:10|max:254',
      price: 'number|above:-1',
      stock: 'integer|above:-1'
    }
  }

  get messages() {
    return {
      'name.required': 'You must provide the name of the product',
      'name.min': 'Very short name',
      'name.max': 'Very long name',

      'description.required': 'You must provide the description of the product',
      'description.min': 'Very short description',
      'description.max': 'Very long description',

      'price.number':'Enter a valid price in float format: [0.0]',
      'price.above':'Enter a valid price not negative',

      'stock.integer':'Enter a valid stock in integer format: [0]',
      'stock.above':'Enter a valid stock not negative',
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

module.exports = ProductValidator
