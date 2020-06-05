const log4js = require('../utils/logger');
const Paypal = require('../utils/Paypal');

const defaultLogger = log4js.getLogger('UsersServices');
const PaymentsConfig = require('../config/PaymentsConfig');
const PaymentRepository = require('../Repositories/PaymentRepository');
const PayoutRepository = require('../Repositories/PayoutRepository');

class PaymentServices {
  async create(payment, options) {
    const { logger = defaultLogger } = options;
    logger.info(
      `Start PaymentServices.create: body ${JSON.stringify(payment)}`,
    );

    const {
      name, sku, price, total, description,
    } = payment;
    let href;
    try {
      const { links } = await Paypal.create(
        PaymentsConfig.create(name, sku, price, total, description),
      );

      if (links) {
        links.forEach((link) => {
          if (link.rel === 'approval_url') {
            href = link.href;
          }
        });
      }

      return { link: href };
    } catch (error) {
      return null;
    }
  }

  async success(payment, options) {
    const { logger = defaultLogger } = options;
    logger.info(
      `Start PaymentServices.create: body ${JSON.stringify(payment)}`,
    );
    const { PayerID, paymentId } = payment;
    try {
      const { transactions: [transaction] } = await Paypal.getPayment(paymentId);
      const { amount, item_list: { items: [item] } } = transaction;
      const { sku } = item;
      const response = await Paypal.execute(paymentId, PaymentsConfig.execute(PayerID, amount));

      if (response) {
        const { id, payer } = response;
        const payerId = payer.payer_info.payer_id;
        PaymentRepository.createTransaction({ paymentId: id, payerId, sku });

        return { success: true };
      }

      return null;
    } catch (error) {
      return { error };
    }
  }

  async payout(payment, options) {
    const { logger = defaultLogger } = options;
    logger.info(
      `Start PaymentServices.create: body ${JSON.stringify(payment)}`,
    );
    const {
      senderBatchId, email, value, emailSubject, note, senderItemId,
    } = payment;
    try {
      const response = await Paypal.payout(
        PaymentsConfig.payout(senderBatchId, email, value, emailSubject, note, senderItemId),
        'falses',
      );

      if (response) {
        const payoutId = response.batch_header.payout_batch_id;
        PayoutRepository.createTransaction({ payoutId, senderItemId });

        return { success: true };
      }

      return null;
    } catch (error) {
      return error;
    }
  }
}
const paymentServices = new PaymentServices();
module.exports = paymentServices;
