'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {
    static boot() {
        super.boot()
        this.addHook('beforeCreate', 'ProductHook.uuid');

    }

    static get primaryKey() {
        return "uuid";
    }

    static get incrementing() {
        return false;
    }
}

module.exports = Product
