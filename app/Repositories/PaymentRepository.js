const DB = require('../utils/DB');

class PaymentRepository {
  constructor() {
    this.createTransaction = async (transactions) => DB('payment-transactions').insert(transactions).returning('*');
  }
}
const paymentRepository = new PaymentRepository();
module.exports = paymentRepository;
