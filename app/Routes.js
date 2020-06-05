const { Router } = require('express');

const PaymentController = require('../app/controllers/PaymentController');

class Routes {
  constructor() {
    this.routes = Router();
    this.config();
  }

  config() {
    this.routes.post('/payment', PaymentController.create);
    this.routes.get('/payment/success', PaymentController.success);
    this.routes.post('/payout', PaymentController.payout);
  }
}
const routes = new Routes();
module.exports = routes.routes;
