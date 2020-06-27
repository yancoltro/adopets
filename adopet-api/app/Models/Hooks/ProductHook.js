'use strict'

const { v4: uuidv4 } = require('uuid');

const ProductHook = exports = module.exports = {}

ProductHook.uuid = async (product) => {
    product.uuid = uuidv4();
}
