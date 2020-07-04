'use strict'

const { test, trait, before } = use('Test/Suite')('Product')
const Product = use('App/Models/Product')
const User = use('App/Models/User')

trait('Auth/Client')
trait('Test/ApiClient')

before(async () => {
  await User.create({ name: 'User Test', email: 'testproduct@test.com', password: 'pass123456' })
})

test('[[POST]{products}: Create new invalid product (no name)', async ({ client }) => {
  const user = await User.findBy('email', 'testproduct@test.com')
  const response = await client
    .post('products')
    .loginVia(user, 'api')
    .send({
      name: '',
      description: 'Adopets Software',
      price: 12.5,
      stock: 37
    }).end()

  response.assertStatus(422)
  response.assertJSON({
    error: "You must provide the name of the product"
  })
})

test('[[POST]{products}: Create new invalid product (short name)', async ({ client }) => {
  const user = await User.findBy('email', 'testproduct@test.com')
  const response = await client
    .post('products')
    .loginVia(user, 'api')
    .send({
      name: 'ab',
      description: 'Adopets Software',
      price: 12.5,
      stock: 37
    }).end()

  response.assertStatus(422)
  response.assertJSON({
    error: "Very short name"
  })
})

test('[[POST]{products}: Create new invalid product (long name)', async ({ client }) => {
  const user = await User.findBy('email', 'testproduct@test.com')
  const response = await client
    .post('products')
    .loginVia(user, 'api')
    .send({
      name: 'System Product Register - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas gravida lorem et massa commodo, eu elementum libero sagittis. Nunc posuere libero arcu, in pulvinar nibh mollis id. Pellentesque sed nulla ipsum. Mauris tincidunt dolor nulla**766',
      description: 'Adopets Software',
      price: 12.5,
      stock: 37
    }).end()

  response.assertStatus(422)
  response.assertJSON({
    error: "Very long name"
  })
})

test('[[POST]{products}: Create new invalid product (no description)', async ({ client }) => {
  const user = await User.findBy('email', 'testproduct@test.com')
  const response = await client
    .post('products')
    .loginVia(user, 'api')
    .send({
      name: 'System Product Register',
      description: '',
      price: 12.5,
      stock: 37
    }).end()

  response.assertStatus(422)
  response.assertJSON({
    error: "You must provide the description of the product"
  })
})

test('[[POST]{products}: Create new invalid product (short description)', async ({ client }) => {
  const user = await User.findBy('email', 'testproduct@test.com')
  const response = await client
    .post('products')
    .loginVia(user, 'api')
    .send({
      name: 'System Product Register',
      description: 'Short min',
      price: 12.5,
      stock: 37
    }).end()

  response.assertStatus(422)
  response.assertJSON({
    error: "Very short description"
  })
})

test('[[POST]{products}: Create new invalid product (long description)', async ({ client }) => {
  const user = await User.findBy('email', 'testproduct@test.com')
  const response = await client
    .post('products')
    .loginVia(user, 'api')
    .send({
      name: 'System Product Register',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas gravida lorem et massa commodo, eu elementum libero sagittis. Nunc posuere libero arcu, in pulvinar nibh mollis id. Pellentesque sed nulla ipsum. Mauris tincidunt dolor nulla, eu tincidunt erat efficitur sit amet. Donec faucibus nunc sit amet urna accumsan faucibus',
      price: 12.5,
      stock: 37
    }).end()

  response.assertStatus(422)
  response.assertJSON({
    error: "Very long description"
  })
})

test('[[POST]{products}: Create new invalid product (not number)', async ({ client }) => {
  const user = await User.findBy('email', 'testproduct@test.com')
  const response = await client
    .post('products')
    .loginVia(user, 'api')
    .send({
      name: 'System Product Register',
      description: 'Adopets Software',
      price: 'asdasda',
      stock: 37
    }).end()

  response.assertStatus(422)
  response.assertJSON({
    error: "Enter a valid price in float format: [0.0]"
  })
})

test('[[POST]{products}: Create new invalid product (negative number)', async ({ client }) => {
  const user = await User.findBy('email', 'testproduct@test.com')
  const response = await client
    .post('products')
    .loginVia(user, 'api')
    .send({
      name: 'System Product Register',
      description: 'Adopets Software',
      price: -1,
      stock: 37
    }).end()

  response.assertStatus(422)
  response.assertJSON({
    error: "Enter a valid price not negative"
  })
})



test('[[POST]{products}: Create new invalid product (not integer)', async ({ client }) => {
  const user = await User.findBy('email', 'testproduct@test.com')
  const response = await client
    .post('products')
    .loginVia(user, 'api')
    .send({
      name: 'System Product Register',
      description: 'Adopets Software',
      price: 10,
      stock: 'asdasdasd'
    }).end()

  response.assertStatus(422)
  response.assertJSON({
    error: "Enter a valid stock in integer format: [0]"
  })
})



test('[[POST]{products}: Create new invalid product (negative integer)', async ({ client }) => {
  const user = await User.findBy('email', 'testproduct@test.com')
  const response = await client
    .post('products')
    .loginVia(user, 'api')
    .send({
      name: 'System Product Register',
      description: 'Adopets Software',
      price: 10,
      stock: -10,
    }).end()

  response.assertStatus(422)
  response.assertJSON({
    error: "Enter a valid stock not negative"
  })
})

test('[[POST]{products}: Create new invalid product (not logged in)', async ({ client }) => {
  const response = await client
    .post('products')
    .send({
      name: 'System Product Register',
      description: 'Adopets Software',
      price: 10,
      stock: 10,
    }).end()

  response.assertStatus(401)
})

test('[[POST]{products}: Create new valide product', async ({ client }) => {
  const user = await User.findBy('email', 'testproduct@test.com')
  const response = await client
    .post('products')
    .loginVia(user, 'api')
    .send({
      name: 'System Product Register',
      description: 'Adopets Software',
      category: 'Computer Program',
      price: 10,
      stock: 10,
    }).end()

  response.assertStatus(200)
  response.assertJSONSubset({
    name: 'System Product Register',
    description: 'Adopets Software',
    price: 10,
    stock: 10,
  })
})

test('[[GET]{products}: Retrive product', async ({ client }) => {
  const user = await User.findBy('email', 'testproduct@test.com')
  const response = await client
    .get('products')
    .loginVia(user, 'api')
    .end()

  response.assertStatus(200)
  response.assertJSONSubset([{
    name: 'System Product Register',
    description: 'Adopets Software',
    price: 10,
    stock: 10,
  }])
})

test('[[GET]{products}: Retrive product (not logged in)', async ({ client }) => {
  const response = await client
    .get('products')
    .end()

  response.assertStatus(401)
})

test('[[GET]{products}: Retrive product per id', async ({ client }) => {
  const user = await User.findBy('email', 'testproduct@test.com')
  const product = await Product.first()
  const response = await client
    .get(`products/${product.uuid}`)
    .loginVia(user, 'api')
    .end()

  response.assertStatus(200)
  response.assertJSONSubset({
    uuid: product.uuid,
    name: 'System Product Register',
    description: 'Adopets Software',
    price: 10,
    stock: 10,
  })
})

test('[[GET]{products}: Retrive product per id (not logged in)', async ({ client }) => {
  const product = await Product.first()
  const response = await client
    .get(`products/${product.uuid}`)
    .end()

  response.assertStatus(401)
})

test('[[GET]{products}: Retrive product per id (not exists)', async ({ client }) => {
  const user = await User.findBy('email', 'testproduct@test.com')
  const response = await client
    .get('products/1')
    .loginVia(user, 'api')
    .end()

  response.assertStatus(404)

})

test('[[GET]{products}: Retrive product per filter (name)', async ({ client }) => {
  const user = await User.findBy('email', 'testproduct@test.com')
  const response = await client
    .get('products/')
    .loginVia(user, 'api')
    .query({ filter: 'name', value: 'System' })
    .end()

  response.assertStatus(200)
  response.assertJSONSubset([{
    name: 'System Product Register',
    description: 'Adopets Software',
    price: 10,
    stock: 10,
  }])
})

test('[[GET]{products}: Retrive product per filter (description)', async ({ client }) => {
  const user = await User.findBy('email', 'testproduct@test.com')
  const response = await client
    .get('products/')
    .loginVia(user, 'api')
    .query({ filter: 'description', value: 'Adopets' })
    .end()

  response.assertStatus(200)
  response.assertJSONSubset([{
    name: 'System Product Register',
    description: 'Adopets Software',
    price: 10,
    stock: 10,
  }])
})

test('[[GET]{products}: Retrive product per filter (category)', async ({ client }) => {
  const user = await User.findBy('email', 'testproduct@test.com')
  const response = await client
    .get('products/')
    .loginVia(user, 'api')
    .query({ filter: 'category', value: 'Computer' })
    .end()

  response.assertStatus(200)
  response.assertJSONSubset([{
    name: 'System Product Register',
    description: 'Adopets Software',
    price: 10,
    stock: 10,
  }])
})

test('[[GET]{products}: Retrive product per invalid filter (name)', async ({ client }) => {
  const user = await User.findBy('email', 'testproduct@test.com')
  const response = await client
    .get('products/')
    .loginVia(user, 'api')
    .query({ filter: 'name', value: 'invalid' })
    .end()

  response.assertStatus(200)
  response.assertJSONSubset([])
})

test('[[GET]{products}: Retrive product per invalid filter (description)', async ({ client }) => {
  const user = await User.findBy('email', 'testproduct@test.com')
  const response = await client
    .get('products/')
    .loginVia(user, 'api')
    .query({ filter: 'description', value: 'invalid' })
    .end()

  response.assertStatus(200)
  response.assertJSONSubset([])
})

test('[[GET]{products}: Retrive product per invalid filter (category)', async ({ client }) => {
  const user = await User.findBy('email', 'testproduct@test.com')
  const response = await client
    .get('products/')
    .loginVia(user, 'api')
    .query({ filter: 'category', value: 'invalid' })
    .end()

  response.assertStatus(200)
  response.assertJSONSubset([])
})

test('[[GET]{products}: Retrive product per filter (page)', async ({ client }) => {
  const user = await User.findBy('email', 'testproduct@test.com')
  const response = await client
    .get('products/')
    .loginVia(user, 'api')
    .query({ filter: 'category', value: 'Computer', page: '1' })
    .end()

  response.assertStatus(200)
  response.assertJSONSubset({
    total: 1,
    perPage: 5,
    page: 1,
    lastPage: 1,
    data:[{
      name: "System Product Register",
      description: "Adopets Software",
      category: "Computer Program",
      price: 10,
      stock: 10
    }]
  })
})

test('[[PUT]{products}: Update product (not Logged)', async ({ client }) => {
  const product = await Product.first()
  const response = await client
    .put(`products/${product.uuid}`)
    .send({
      name: 'Edited Name',
      description: 'Edited Description',
      category: 'Edited Category',
      price: 10,
      stock: 10,
    })
    .end()

  response.assertStatus(401)
})

test('[[PUT]{products}: Update product (not exists)', async ({ client }) => {
  const user = await User.findBy('email', 'testproduct@test.com')
  const product = await Product.first()
  const response = await client
    .put(`products/1`)
    .loginVia(user, 'api')
    .send({
      name: 'Edited Name',
      description: 'Edited Description',
      category: 'Edited Category',
      price: 10,
      stock: 10,
    })
    .end()

  response.assertStatus(404)
})

test('[[PUT]{products}: Update product', async ({ client }) => {
  const user = await User.findBy('email', 'testproduct@test.com')
  const product = await Product.first()
  const response = await client
    .put(`products/${product.uuid}`)
    .loginVia(user, 'api')
    .send({
      name: 'Edited Name',
      description: 'Edited Description',
      category: 'Edited Category',
      price: 10,
      stock: 10,
    })
    .end()

  response.assertStatus(200)
  response.assertJSONSubset({
    uuid: product.uuid,
    name: 'Edited Name',
    description: 'Edited Description',
    category: 'Edited Category',
    price: 10,
    stock: 10,
  })
})

test('[[DELETE]{products}: Delete product (not Logged)', async ({ client }) => {
  const product = await Product.first()
  const response = await client
    .delete(`products/${product.uuid}`)
    .end()

  response.assertStatus(401)
})

test('[[DELETE]{products}: Delete product (not exists)', async ({ client }) => {
  const user = await User.findBy('email', 'testproduct@test.com')
  const product = await Product.first()
  const response = await client
    .delete(`products/1`)
    .loginVia(user, 'api')
    .end()

  response.assertStatus(404)
})

test('[[DELETE]{products}: Delete product (not exists)', async ({ client }) => {
  const user = await User.findBy('email', 'testproduct@test.com')
  const product = await Product.first()
  const response = await client
    .delete(`products/${product.uuid}`)
    .loginVia(user, 'api')
    .end()

  response.assertStatus(204)
})