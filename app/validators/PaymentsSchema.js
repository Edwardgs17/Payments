module.exports = {
  title: 'Payment',
  type: 'object',
  propertaries: {
    sku: {
      type: 'number',
    },
    name: {
      type: 'string',
    },
    price: {
      type: 'number',
    },
    total: {
      type: 'number',
    },
    description: {
      type: 'string',
    },
  },
  required: ['sku', 'name', 'price', 'total', 'description'],
};
