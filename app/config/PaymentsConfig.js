const PaymentsConfig = module.exports;
const { MICROSERVICE_URL, PREFIX } = require('../config/AppConfig');

PaymentsConfig.create = (name, sku, price, total, description) => ({
  intent: 'sale',
  payer: {
    payment_method: 'paypal',
  },
  redirect_urls: {
    return_url: `${MICROSERVICE_URL}${PREFIX}/payment/success`,
    cancel_url: `${MICROSERVICE_URL}${PREFIX}/payment/cancel`,
  },
  transactions: [{
    item_list: {
      items: [{
        name,
        sku,
        price,
        currency: 'USD',
        quantity: 1,
      }],
    },
    amount: {
      currency: 'USD',
      total,
    },
    description,
  }],
});

PaymentsConfig.execute = (payerId, amount) => ({
  payer_id: payerId,
  transactions: [{
    amount,
  }],
});

PaymentsConfig.payout = (senderBatchId, email, value, emailSubject, note, senderItemId) => ({
  sender_batch_header: {
    sender_batch_id: senderBatchId,
    email_subject: emailSubject,
  },
  items: [
    {
      recipient_type: 'EMAIL',
      amount: {
        value,
        currency: 'USD',
      },
      receiver: email,
      note,
      sender_item_id: senderItemId,
    },
  ],
});
