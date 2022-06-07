const productResolver = require('./resolvers/product.resolver')
const productResolverParital = require('./resolvers/product.resolver.partial')

module.exports = {
  ...productResolver,
  ...productResolverParital
}
