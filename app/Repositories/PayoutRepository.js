const DB = require('../utils/DB');

class PayoutRepository {
  constructor() {
    this.createTransaction = async (transactions) => DB('payout-transactions').insert(transactions).returning('*');
  }
}
const payoutRepository = new PayoutRepository();
module.exports = payoutRepository;
