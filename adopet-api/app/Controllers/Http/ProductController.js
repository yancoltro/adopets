'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Product = use('App/Models/Product')

/**
 * Resourceful controller for interacting with products
 */
class ProductController {
  /**
   * Show a list of all products.
   * GET products
   * GET products?page=:page&limit:limit
   * GET products?page=:page&limit:limit
   */
  async index({request}) {
    const page = request.input('page')
    const limit = request.input('limit')
    var products = {}
       
    if(typeof(page) === 'undefined' && typeof(limit) === 'undefined')
      /**
       * this line works if the user does not enter pagination parameters,
       * returning all records without pagination
       * Ex.: GET products
       */
      products = await Product.all()
    else
      /**
       * this line works if the user explicitly informs the pagination
       * Ex.: GET products?page=2&limit=20
       * OR user inform parameter, but not assign value for this
       * Ex.: GET products?page=&limit:=
      */
      products = await Product.query().paginate(page || 1,limit || 5)
   
    return products
  }

   /**
   * Display a products with filters
   * GET products/filter=:field&value=:value
   * GET products/filter=:field&value=:value?page=:page?limit=:limit
   * GET products/filter=:field&value=:value?page=?limit=
   */
  async filter({params}) {
    /**
     * query base: work in all cases
     */
    var products = Product
      .query()
      .where(params.field || 'name','like',`%${params.value}%`)
    /**
       * this if works if the user explicitly informs the pagination
       * Ex.: GET page=2
      */
    if(params.page !== null)
      return products.paginate(params.page,5)
    /**
     * if user not informed the page value, 
     * return data only de filters
     */
    return products.fetch()
  }

  /**
   * Create/save a new product.
   * POST products
   */
  async store({ request }) {
    const data = request.only(['name', 'description', 'category', 'price', 'stock'])
    const product = await Product.create(data);
    return product
  }

  /**
   * Display a single product.
   * GET products/:uuid
   */
  async show({ params }) {
    const product = await Product.findOrFail(params.id)
    return product
  }

  /**
   * Update product details.
   * PUT or PATCH products/:uuid
   */
  async update({ params, request }) {
    const product = await Product.findOrFail(params.id)
    const data = request.only(['name', 'description', 'category', 'price', 'stock'])

    product.merge(data)
    await product.save()

    return product
  }

  /**
   * Delete a product with uuid.
   * DELETE products/:uuid
   */
  async destroy({ params }) {
    const product = await Product.findOrFail(params.id)
    await product.delete()
  }
}

module.exports = ProductController
