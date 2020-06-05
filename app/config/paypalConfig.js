const paypalConfig = require('paypal-rest-sdk');

paypalConfig.configure({
  mode: 'sandbox',
  client_id: 'Ab5ME4WRu_1AQk2jGEsutGLADwQ5RDqm-fY5_RbKQofbyrisug67s_s7QzioEXkiyWZGI3dVq8avYshn',
  client_secret: 'EJxT8ltfCTXkRQEe6yYEFbcpDNX9Oh6XRaWdltvPdwWAOzQDQXyrHHDMaNWc0p29hGAo1GRq1j0vJ4cb',
});
module.exports = paypalConfig;
