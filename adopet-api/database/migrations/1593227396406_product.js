'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductsSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.uuid('uuid').primary();
      table.string('name', 254).notNullable()
      table.string('description', 254).notNullable()
      table.string('category', 254).defaultTo('Uninformed')
      table.float('price').unsigned().defaultTo(0.0)
      table.integer('stock').unsigned().default(0)
      table.timestamps()
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductsSchema
