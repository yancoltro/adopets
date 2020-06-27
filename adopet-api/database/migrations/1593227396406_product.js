'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductsSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.uuid('uuid').primary();
      table.string('name', 255).notNullable()
      table.string('description', 254).notNullable()
      table.string('category', 254).notNullable().defaultTo('UNINFORMED')
      table.float('price').notNullable().defaultTo(0.0)
      table.integer('stock').notNullable().default(0)
      table.timestamps()
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductsSchema
