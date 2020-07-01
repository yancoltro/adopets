'use strict'

const { test, trait } = use('Test/Suite')('Product')
const Product = use('App/Models/Product')

trait('Test/ApiClient')

// test('get list of products', async ({ client }) => {
//   await Product.create({
//     name : "Cervejaria Don Giuseppe",
//     description : "American Light Lager",
//     category : "Cerveja",
//     price : "8",
//     stock : "150"
//   })

//   const response = await client.get('products').end()

//   response.assertStatus(401)
//   response.assertJSONSubset([{
//     name : "Cervejaria Don Giuseppe",
//     description : "American Light Lager",
//     category : "Cerveja",
//     price : "8",
//     stock : "150"
//   }])
// })

test('make sure 2 + 2 is 4', async ({ assert }) => {
  assert.equal(2 + 2, 4)
})