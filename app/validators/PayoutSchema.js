module.exports = {
  title: 'Payment',
  type: 'object',
  propertaries: {
    senderBatchId: {
      type: 'number',
    },
    email: {
      type: 'string',
    },
    value: {
      type: 'number',
    },
    emailSubject: {
      type: 'string',
    },
    note: {
      type: 'string',
    },
    senderItemId: {
      type: 'string',
    },
  },
  required: ['senderBatchId', 'email', 'value', 'emailSubject', 'note', 'senderItemId'],
};
