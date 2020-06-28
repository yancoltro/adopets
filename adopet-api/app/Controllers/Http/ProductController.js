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
   */
  async index() {
    const products = await Product.all()
    return products
  }

   /**
   * Display a products with filters
   * GET products/filter=:field&value=:value
   */
  async filter({params}) {
    const products = await Product
      .query()
      .where(params.field,'like',`%${params.value}%`)
      .fetch()
    return products
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
